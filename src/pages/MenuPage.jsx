import React, { useState, useMemo, useRef } from 'react'
import { Search, Plus, Star, Flame, X, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { useBusinessContext } from '../context/BusinessContext'
import './MenuPage.css'

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCartContext()
  const { businessInfo } = useBusinessContext()
  const categoryRef = useRef(null)

  // Complete menu data based on your restaurant
  const menuItems = [
    // Buffalo Wings
    {
      id: 1,
      name: "Classic Buffalo Wings",
      category: "Buffalo Wings",
      price: 12.99,
      description: "Traditional buffalo wings with our signature hot sauce",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Medium",
      popular: true
    },
    {
      id: 2,
      name: "BBQ Wings",
      category: "Buffalo Wings", 
      price: 12.99,
      description: "Sweet and tangy BBQ glazed wings",
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Mild",
      popular: true
    },
    {
      id: 3,
      name: "Spicy Korean Wings",
      category: "Buffalo Wings",
      price: 14.99,
      description: "Korean-style wings with gochujang glaze",
      image: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Hot",
      popular: false
    },
    {
      id: 4,
      name: "Honey Garlic Wings",
      category: "Buffalo Wings",
      price: 13.99,
      description: "Sweet honey garlic glazed wings",
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Mild",
      popular: false
    },

    // Whole Wings
    {
      id: 5,
      name: "Whole Wing Platter",
      category: "Whole Wings",
      price: 18.99,
      description: "Full-size wings with your choice of sauce",
      image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Medium",
      popular: false
    },
    {
      id: 6,
      name: "Jumbo Whole Wings",
      category: "Whole Wings",
      price: 22.99,
      description: "Extra large whole wings, perfect for sharing",
      image: "https://images.unsplash.com/photo-1585703900468-13c7a978ad86?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Medium",
      popular: false
    },

    // Chicken Tenders
    {
      id: 7,
      name: "Crispy Chicken Tenders",
      category: "Chicken Tenders",
      price: 11.99,
      description: "Hand-breaded chicken tenders with dipping sauce",
      image: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "Mild",
      popular: true
    },
    {
      id: 8,
      name: "Buffalo Chicken Tenders",
      category: "Chicken Tenders",
      price: 12.99,
      description: "Crispy tenders tossed in buffalo sauce",
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "Medium",
      popular: false
    },

    // Sandwiches
    {
      id: 9,
      name: "Buffalo Chicken Sandwich",
      category: "Sandwiches",
      price: 13.99,
      description: "Crispy chicken breast with buffalo sauce on brioche bun",
      image: "https://images.pexels.com/photos/5474836/pexels-photo-5474836.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "Medium",
      popular: false
    },
    {
      id: 10,
      name: "BBQ Chicken Sandwich",
      category: "Sandwiches",
      price: 13.99,
      description: "Grilled chicken with BBQ sauce and coleslaw",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "Mild",
      popular: false
    },

    // Fish
    {
      id: 11,
      name: "2 PC Catfish",
      category: "Fish",
      price: 11.25,
      description: "Two pieces of golden fried catfish",
      image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 12,
      name: "3 PC Catfish",
      category: "Fish",
      price: 14.99,
      description: "Three pieces of golden fried catfish",
      image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&h=400&fit=crop&crop=center&q=80",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 16,
      name: "Small Fish Nuggets",
      category: "Fish",
      price: 9.99,
      description: "Bite-sized fish nuggets, perfect for snacking",
      image: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 17,
      name: "Large Fish Nuggets",
      category: "Fish",
      price: 14.99,
      description: "Large portion of crispy fish nuggets",
      image: "https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 13,
      name: "10 Pc Shrimp",
      category: "Shrimp",
      price: 11.70,
      description: "Ten pieces of crispy fried shrimp",
      image: "https://images.pexels.com/photos/5718058/pexels-photo-5718058.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: true
    },
    {
      id: 14,
      name: "16 Pc Jumbo Shrimp",
      category: "Shrimp",
      price: 24.99,
      description: "Sixteen pieces of large jumbo shrimp",
      image: "https://images.pexels.com/photos/4553031/pexels-photo-4553031.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 15,
      name: "20 Pc Shrimp",
      category: "Shrimp",
      price: 19.99,
      description: "Twenty pieces of crispy fried shrimp",
      image: "https://images.pexels.com/photos/4553033/pexels-photo-4553033.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },

    // Side Orders
    {
      id: 18,
      name: "Loaded Fries",
      category: "Side Orders",
      price: 8.99,
      description: "Crispy fries topped with cheese, bacon, and green onions",
      image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 19,
      name: "Mac & Cheese",
      category: "Side Orders",
      price: 6.99,
      description: "Creamy homemade mac and cheese",
      image: "https://images.pexels.com/photos/5949902/pexels-photo-5949902.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 20,
      name: "Coleslaw",
      category: "Side Orders",
      price: 4.99,
      description: "Fresh and creamy coleslaw",
      image: "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 21,
      name: "Onion Rings",
      category: "Side Orders",
      price: 7.99,
      description: "Golden crispy onion rings",
      image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },

    // Drinks
    {
      id: 22,
      name: "Bottle Pop",
      category: "Drinks",
      price: 2.50,
      description: "Assorted soft drinks",
      image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 23,
      name: "Bottle Water",
      category: "Drinks",
      price: 1.30,
      description: "Pure bottled water",
      image: "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 24,
      name: "Craft Beer",
      category: "Drinks",
      price: 4.99,
      description: "Local craft beer selection",
      image: "https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },

    // Desserts
    {
      id: 25,
      name: "Chocolate Brownie",
      category: "Desserts",
      price: 6.99,
      description: "Rich chocolate brownie with vanilla ice cream",
      image: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    },
    {
      id: 26,
      name: "Cheesecake",
      category: "Desserts",
      price: 7.99,
      description: "New York style cheesecake",
      image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1",
      spiceLevel: "None",
      popular: false
    }
  ]

  const categories = ['All', 'Buffalo Wings', 'Whole Wings', 'Chicken Tenders', 'Sandwiches', 'Fish', 'Shrimp', 'Side Orders', 'Drinks', 'Desserts']

  // Filter items based on category and search
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const handleAddToCart = (item, qty = 1) => {
    addToCart(item, qty)
    if (selectedItem) {
      setSelectedItem(null)
      setQuantity(1)
    }
  }

  const openItemDetails = (item) => {
    setSelectedItem(item)
    setQuantity(1)
  }

  const closeItemDetails = () => {
    setSelectedItem(null)
    setQuantity(1)
  }

  const scrollCategories = (direction) => {
    if (categoryRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      categoryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
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
    <div className="menu-page">
      {/* Menu Hero */}
      <section className="menu-hero">
        <div className="container">
          <div className="menu-hero-content">
            <h1>Tasty Wings</h1>
            <div className="restaurant-info">
              <div className="rating">
                <Star size={20} fill="currentColor" />
                <span>4.1 • 500+ ratings</span>
              </div>
              <div className="delivery-info">
                <span>Delivery: 26 min</span>
                <span>•</span>
                <span>Pickup: Preorder</span>
                <span className="virtual-badge">Virtual Brand</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="container">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search Tasty Wings"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="promo-banner">
              <span className="promo-text">Spend $50, get $5 off</span>
              <span className="promo-progress">$50 to go</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="category-nav">
            <button className="scroll-btn scroll-left" onClick={() => scrollCategories('left')}>
              <ChevronLeft size={20} />
            </button>
            <div className="category-filters" ref={categoryRef}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <button className="scroll-btn scroll-right" onClick={() => scrollCategories('right')}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Menu Items Grid */}
          <div className="menu-items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-item-card" onClick={() => openItemDetails(item)}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  {item.popular && (
                    <div className="popular-badge">
                      <Star size={14} fill="currentColor" />
                      Popular
                    </div>
                  )}
                  {item.spiceLevel && item.spiceLevel !== 'None' && (
                    <div className="spice-indicator">
                      {getSpiceIcon(item.spiceLevel)}
                    </div>
                  )}
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <button 
                      className="add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Item Details Modal */}
            {selectedItem && (
              <div className="item-modal-overlay" onClick={closeItemDetails}>
                <div className="item-modal" onClick={(e) => e.stopPropagation()}>
                  <button className="close-modal" onClick={closeItemDetails}>
                    <X size={24} />
                  </button>
                  
                  <div className="modal-image">
                    <img src={selectedItem.image} alt={selectedItem.name} />
                  </div>
                  
                  <div className="modal-content">
                    <h2>{selectedItem.name}</h2>
                    
                    <div className="modal-badges">
                      {selectedItem.popular && (
                        <span className="modal-badge popular">
                          <Star size={14} fill="currentColor" /> Popular
                        </span>
                      )}
                      {selectedItem.spiceLevel && selectedItem.spiceLevel !== 'None' && (
                        <span className="modal-badge spice">
                          {getSpiceIcon(selectedItem.spiceLevel)} {selectedItem.spiceLevel}
                        </span>
                      )}
                    </div>
                    
                    <p className="modal-description">{selectedItem.description}</p>
                    
                    <div className="modal-price">
                      <span>${selectedItem.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="modal-actions">
                      <div className="quantity-selector">
                        <button 
                          className="quantity-btn" 
                          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity">{quantity}</span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(selectedItem, quantity)}
                      >
                        Add to cart - ${(selectedItem.price * quantity).toFixed(2)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-results">
              <p>No items found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MenuPage 