# Tasty Wings Restaurant - Online Ordering System

A modern, full-stack web application for a wing restaurant with online ordering capabilities. Built with React, Node.js, Express, SQLite, and Stripe for payments.

## 🍗 Features

### Customer Features
- **Modern UI/UX**: Clean, responsive design optimized for all devices
- **Menu Browsing**: Browse wings, sides, drinks, and desserts with detailed descriptions
- **Shopping Cart**: Add items, modify quantities, and manage orders
- **Order Types**: Support for both delivery and pickup orders
- **Real-time Updates**: Live order status tracking
- **Payment Processing**: Secure payments via Stripe integration
- **Order History**: Track previous orders and reorder favorites

### Admin Features
- **Order Management**: View, update, and track all incoming orders
- **Menu Management**: Add, edit, and manage menu items and availability
- **Real-time Dashboard**: Live notifications for new orders
- **Business Settings**: Manage restaurant information and settings
- **Analytics**: Order statistics and business insights

### Technical Features
- **Real-time Communication**: Socket.io for live updates
- **Responsive Design**: Mobile-first approach with modern CSS
- **State Management**: React Context API for global state
- **Database**: SQLite for development, easily upgradeable to PostgreSQL
- **Payment Integration**: Stripe for secure payment processing
- **API Architecture**: RESTful API with proper error handling

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons
- **CSS Variables** - Modern styling with custom properties
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database for development
- **Socket.io** - Real-time bidirectional communication
- **Stripe** - Payment processing
- **UUID** - Unique identifier generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tasty-wings-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Database (optional - defaults to SQLite)
   DATABASE_URL=sqlite:./orders.db
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the frontend (Vite) and backend (Express) servers concurrently.

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Admin Dashboard: http://localhost:5173/admin-login

## 🏗️ Project Structure

```
tasty-wings-app/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Cart.jsx             # Shopping cart sidebar
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── context/                 # React Context providers
│   │   ├── BusinessContext.jsx  # Business data management
│   │   └── CartContext.jsx      # Shopping cart state
│   ├── pages/                   # Page components
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── MenuPage.jsx         # Menu browsing
│   │   ├── CheckoutPage.jsx     # Order checkout
│   │   ├── DashboardPage.jsx    # Admin dashboard
│   │   └── ...
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── server/                      # Backend source code
│   └── index.js                 # Express server and API routes
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

## 🎯 Usage

### For Customers

1. **Browse Menu**: Navigate to the menu page to view available items
2. **Add to Cart**: Click "Add to Cart" on desired items
3. **Review Order**: Open the cart sidebar to review and modify your order
4. **Checkout**: Proceed to checkout and enter delivery/pickup information
5. **Payment**: Complete payment using Stripe's secure payment form
6. **Track Order**: Receive real-time updates on your order status

### For Administrators

1. **Access Admin**: Navigate to `/admin-login` and authenticate
2. **View Orders**: Monitor incoming orders in real-time
3. **Update Status**: Change order status as items are prepared and delivered
4. **Manage Menu**: Add, edit, or disable menu items
5. **Business Settings**: Update restaurant information and settings

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/menu` - Get available menu items
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details
- `POST /api/create-payment-intent` - Create Stripe payment intent

### Admin Endpoints
- `GET /api/orders` - Get all orders (admin only)
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/admin/menu` - Get all menu items including disabled
- `PATCH /api/admin/menu/:id` - Update menu item
- `GET /api/settings` - Get business settings

## 🎨 Customization

### Branding
- Update colors in `src/index.css` CSS variables
- Replace logo and business information in `BusinessContext.jsx`
- Modify menu items and categories as needed

### Styling
- CSS variables for consistent theming
- Responsive design with mobile-first approach
- Modern animations and transitions

### Business Logic
- Easily configurable tax rates and delivery fees
- Customizable order statuses and workflows
- Flexible menu categorization

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_stripe_publishable_key
PORT=3001
```

### Deployment Platforms
- **Railway**: Configured with `railway.toml`
- **Vercel**: Frontend deployment ready
- **Heroku**: Compatible with Heroku deployment
- **DigitalOcean**: App Platform ready

## 🔒 Security Features

- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Environment variable protection for sensitive data
- Stripe's secure payment processing
- SQL injection prevention with parameterized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@tastywings.com or create an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- Stripe for secure payment processing
- Lucide for beautiful icons
- The open-source community for inspiration and tools # tasty-wings-web-app
