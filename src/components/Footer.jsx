import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react'
import { useBusinessContext } from '../context/BusinessContext'
import './Footer.css'

const Footer = () => {
  const { businessInfo } = useBusinessContext()

  return (
    <footer className="footer" id="main-footer">
      <div className="container">
        <div className="footer-content">
          {/* Business Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">🍗</div>
              <div className="logo-text">
                <span className="logo-name">{businessInfo.name}</span>
                <span className="logo-tagline">{businessInfo.tagline}</span>
              </div>
            </div>
            <p className="footer-description">
              {businessInfo.description}
            </p>
          </div>

          {/* Contact and Hours sections removed */}

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/order-tracking">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Directions Button */}
        <div className="directions-container">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessInfo.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="directions-button"
          >
            <MapPin size={18} />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Social Media & Copyright */}
        <div className="footer-bottom">
          <div className="social-media">
            <a 
              href={businessInfo.socialMedia.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href={businessInfo.socialMedia.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href={businessInfo.socialMedia.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 