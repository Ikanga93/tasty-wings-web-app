import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { useBusinessContext } from '../context/BusinessContext'
import './Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemCount, openCart } = useCartContext()
  const { businessInfo } = useBusinessContext()
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCartClick = () => {
    openCart()
    closeMobileMenu()
  }

  const isActiveLink = (path) => {
    return location.pathname === path
  }

  const cartItemCount = getCartItemCount()

  return (
    <header className="header">
      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo-container">
              <img 
                src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-fried-chicken-wings-png-image_13369769.png" 
                alt="Chicken Wing"
                className="logo-icon"
                onError={(e) => {
                  e.target.src = 'https://www.pngmart.com/files/22/Chicken-Wings-PNG-Transparent.png'
                }}
              />
              <Link to="/" className="logo" onClick={closeMobileMenu}>
                <div className="logo-text">
                  <span className="logo-name">{businessInfo.name}</span>
                  <span className="logo-tagline">{businessInfo.tagline}</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav-desktop">
              <Link 
                to="/" 
                className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className={`nav-link ${isActiveLink('/menu') ? 'active' : ''}`}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
              >
                About
              </Link>
              <a 
                href="https://fatsandwichchampaign.com/" 
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fat Sandwich & Company
              </a>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="header-actions">
              {/* Cart Button */}
              <button 
                className="cart-button"
                onClick={handleCartClick}
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="cart-badge" data-count={cartItemCount}>{cartItemCount}</span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-content">
          <Link 
            to="/" 
            className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className={`nav-link ${isActiveLink('/menu') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Menu
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <a 
            href="https://fatsandwichchampaign.com/" 
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            Fat Sandwich & Company
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  )
}

export default Header 