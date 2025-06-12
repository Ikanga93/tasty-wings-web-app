import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { BusinessProvider } from './context/BusinessContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import CheckoutPage from './pages/CheckoutPage'

// Component to conditionally render customer layout
const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  // Check if current route is an admin page
  const isAdminPage = location.pathname.startsWith('/dashboard') || 
                     location.pathname.startsWith('/admin-login')

  console.log('Tasty Wings App rendering...')

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (authStatus) => {
    setIsAuthenticated(authStatus)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setIsAuthenticated(false)
  }

  return (
    <div className="App">
      {/* Only show customer header on customer pages */}
      {!isAdminPage && <Header />}
        
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        <Route 
          path="/menu" 
          element={<MenuPage />} 
        />
        <Route 
          path="/about" 
          element={<AboutPage />} 
        />
        <Route 
          path="/contact" 
          element={<ContactPage />} 
        />
        <Route 
          path="/checkout" 
          element={<CheckoutPage />} 
        />
        <Route 
          path="/admin-login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/order-tracking" 
          element={<OrderTrackingPage />} 
        />
      </Routes>
        
      {/* Only show customer footer on customer pages */}
      {!isAdminPage && <Footer />}
        
      {/* Only show cart on customer pages */}
      {!isAdminPage && <Cart />}
    </div>
  )
}

function App() {
  try {
    return (
      <BusinessProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </BusinessProvider>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '100vh' }}>
        <h1 style={{ color: 'red' }}>Error in App Component</h1>
        <p>Error: {error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
}

export default App 