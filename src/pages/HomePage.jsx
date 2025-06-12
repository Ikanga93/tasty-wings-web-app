import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, MapPin, Phone, Flame, Award, Truck, Plus } from 'lucide-react'
import { useBusinessContext } from '../context/BusinessContext'
import { useCartContext } from '../context/CartContext'
import './HomePage.css'

const HomePage = () => {
  const { businessInfo } = useBusinessContext()
  const { addToCart } = useCartContext()

  // Most popular items from our menu
  const popularItems = [
    {
      id: 1,
      name: "Classic Buffalo Wings",
      category: "Buffalo Wings",
      price: 12.99,
      description: "Traditional buffalo wings with our signature hot sauce",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&crop=center&q=80",
      spiceLevel: "Medium",
      popular: true
    },
    {
      id: 2,
      name: "BBQ Wings",
      category: "Buffalo Wings", 
      price: 12.99,
      description: "Sweet and tangy BBQ glazed wings",
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop&crop=center&q=80",
      spiceLevel: "Mild",
      popular: true
    },
    {
      id: 7,
      name: "Crispy Chicken Tenders",
      category: "Chicken Tenders",
      price: 11.99,
      description: "Hand-breaded chicken tenders with dipping sauce",
      image: "https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&h=300&fit=crop&crop=center&q=80",
      spiceLevel: "Mild",
      popular: true
    },
    {
      id: 9,
      name: "Buffalo Chicken Sandwich",
      category: "Sandwiches",
      price: 13.99,
      description: "Crispy chicken breast with buffalo sauce on brioche bun",
      image: "https://images.pexels.com/photos/5474836/pexels-photo-5474836.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      spiceLevel: "Medium",
      popular: true
    }
  ]

  const handleAddToCart = (item) => {
    addToCart(item, 1)
  }

  const getSpiceIcon = (spiceLevel) => {
    switch(spiceLevel) {
      case 'Hot': return '🌶️🌶️🌶️'
      case 'Medium': return '🌶️🌶️'
      case 'Mild': return '🌶️'
      default: return ''
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Welcome to {businessInfo.name}</h1>
              <p className="hero-subtitle">{businessInfo.tagline}</p>
              <p className="hero-description">{businessInfo.description}</p>
              <div className="hero-actions">
                <Link to="/menu" className="btn btn-primary btn-lg">
                  Order Now
                </Link>
                <a 
                  href={`tel:${businessInfo.phone.replace(/[^0-9]/g, '')}`} 
                  className="btn btn-lg"
                  style={{ backgroundColor: '#fff', color: '#000', border: '2px solid #000', fontWeight: '600' }}
                >
                  <Phone size={18} style={{ marginRight: '8px' }} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-fried-chicken-wings-png-image_13369769.png" 
            alt="Delicious chicken wings"
            className="hero-chicken-image"
            onError={(e) => {
              // Fallback to a different PNG with transparent background
              e.target.src = 'https://www.pngmart.com/files/22/Chicken-Wings-PNG-Transparent.png'
            }}
          />
          {/* Real spicy wing */}
          <img 
            src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=400&fit=crop&crop=center&q=80" 
            alt="Spicy buffalo wings with sauce"
            className="hero-real-wing"
            onError={(e) => {
              // Fallback to another spicy wing image
              e.target.src = 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=400&fit=crop&crop=center&q=80'
            }}
          />
          {/* Floating spice elements */}
          <div className="spice-element spice-1">🌶️</div>
          <div className="spice-element spice-2">🔥</div>
          <div className="spice-element spice-3">🌶️</div>
          <div className="spice-element spice-4">💨</div>
          <div className="spice-element spice-5">🌶️</div>
          {/* Sauce drips */}
          <div className="sauce-drip drip-1"></div>
          <div className="sauce-drip drip-2"></div>
          <div className="sauce-drip drip-3"></div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="popular-items">
        <div className="container">
          <div className="section-header">
            <h2>Popular Items</h2>
            <p>Try our customer favorites</p>
          </div>
          <div className="items-grid">
            {popularItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&crop=center&q=80'
                    }}
                  />
                  {item.spiceLevel && item.spiceLevel !== 'None' && (
                    <div className="spice-level">
                      {getSpiceIcon(item.spiceLevel)}
                    </div>
                  )}
                  {item.popular && (
                    <div className="popular-badge">
                      <Star size={14} fill="currentColor" />
                      Popular
                    </div>
                  )}
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="item-footer">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/menu" className="btn" style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}>
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* No features or contact info sections */}
    </div>
  )
}

export default HomePage 