import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import sqlite3 from 'sqlite3'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Stripe from 'stripe'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_your_secret_key_here')

const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())
app.use(express.static(join(__dirname, '../dist')))

// Database setup
const db = new sqlite3.Database('orders.db')

// Initialize database tables
db.serialize(() => {
  // Orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT,
    order_type TEXT NOT NULL,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL,
    tax REAL NOT NULL,
    delivery_fee REAL NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Menu items table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    spice_level TEXT,
    popular BOOLEAN DEFAULT 0,
    available BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Business settings table
  db.run(`CREATE TABLE IF NOT EXISTS business_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
})

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join_admin', () => {
    socket.join('admin')
    console.log('Admin joined')
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// API Routes

// Get all orders (admin)
app.get('/api/orders', (req, res) => {
  const query = `
    SELECT * FROM orders 
    ORDER BY created_at DESC
  `
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err)
      return res.status(500).json({ error: 'Failed to fetch orders' })
    }
    
    // Parse items JSON for each order
    const orders = rows.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }))
    
    res.json(orders)
  })
})

// Get single order
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params
  
  db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching order:', err)
      return res.status(500).json({ error: 'Failed to fetch order' })
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    const order = {
      ...row,
      items: JSON.parse(row.items)
    }
    
    res.json(order)
  })
})

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerInfo,
      orderType,
      items,
      subtotal,
      tax,
      deliveryFee,
      total,
      paymentMethod
    } = req.body

    const orderId = uuidv4()
    
    // Create order in database
    const query = `
      INSERT INTO orders (
        id, customer_name, customer_email, customer_phone, customer_address,
        order_type, items, subtotal, tax, delivery_fee, total, status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const values = [
      orderId,
      customerInfo.name,
      customerInfo.email,
      customerInfo.phone,
      customerInfo.address || '',
      orderType,
      JSON.stringify(items),
      subtotal,
      tax,
      deliveryFee,
      total,
      'pending',
      paymentMethod === 'cash' ? 'pending' : 'pending'
    ]

    db.run(query, values, function(err) {
      if (err) {
        console.error('Error creating order:', err)
        return res.status(500).json({ error: 'Failed to create order' })
      }

      // Emit new order to admin
      io.to('admin').emit('new_order', {
        id: orderId,
        customer_name: customerInfo.name,
        total,
        status: 'pending'
      })

      res.status(201).json({
        success: true,
        orderId,
        message: 'Order created successfully'
      })
    })

  } catch (error) {
    console.error('Error processing order:', error)
    res.status(500).json({ error: 'Failed to process order' })
  }
})

// Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled']
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  db.run(
    'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        console.error('Error updating order status:', err)
        return res.status(500).json({ error: 'Failed to update order status' })
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Order not found' })
      }

      // Emit status update
      io.emit('order_status_update', { orderId: id, status })

      res.json({ success: true, message: 'Order status updated' })
    }
  )
})

// Create payment intent (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: 'Failed to create payment intent' })
  }
})

// Get menu items
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items WHERE available = 1 ORDER BY category, name', [], (err, rows) => {
    if (err) {
      console.error('Error fetching menu items:', err)
      return res.status(500).json({ error: 'Failed to fetch menu items' })
    }
    res.json(rows)
  })
})

// Admin: Get all menu items
app.get('/api/admin/menu', (req, res) => {
  db.all('SELECT * FROM menu_items ORDER BY category, name', [], (err, rows) => {
    if (err) {
      console.error('Error fetching menu items:', err)
      return res.status(500).json({ error: 'Failed to fetch menu items' })
    }
    res.json(rows)
  })
})

// Admin: Update menu item
app.patch('/api/admin/menu/:id', (req, res) => {
  const { id } = req.params
  const updates = req.body
  
  const allowedFields = ['name', 'description', 'price', 'category', 'image', 'spice_level', 'popular', 'available']
  const setClause = []
  const values = []
  
  Object.keys(updates).forEach(key => {
    if (allowedFields.includes(key)) {
      setClause.push(`${key} = ?`)
      values.push(updates[key])
    }
  })
  
  if (setClause.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' })
  }
  
  values.push(id)
  
  const query = `UPDATE menu_items SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
  
  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating menu item:', err)
      return res.status(500).json({ error: 'Failed to update menu item' })
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Menu item not found' })
    }
    
    res.json({ success: true, message: 'Menu item updated' })
  })
})

// Business settings
app.get('/api/settings', (req, res) => {
  db.all('SELECT * FROM business_settings', [], (err, rows) => {
    if (err) {
      console.error('Error fetching settings:', err)
      return res.status(500).json({ error: 'Failed to fetch settings' })
    }
    
    const settings = {}
    rows.forEach(row => {
      settings[row.key] = row.value
    })
    
    res.json(settings)
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
server.listen(PORT, () => {
  console.log(`🍗 Tasty Wings server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err)
      } else {
        console.log('Database connection closed')
      }
      process.exit(0)
    })
  })
}) 