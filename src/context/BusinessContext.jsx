import React, { createContext, useContext, useState, useEffect } from 'react'

const BusinessContext = createContext()

export const useBusinessContext = () => {
  const context = useContext(BusinessContext)
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider')
  }
  return context
}

export const BusinessProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Tasty Wings & Sandwiches',
    tagline: 'Premium Wings & More',
    description: 'Experience the finest wings in town with our signature sauces and crispy perfection.',
    phone: '(217) 552-1278',
    email: 'orders@tastywings.com',
    address: '1702 W Bradley Ave, Champaign, IL 61821-2202, United States',
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    socialMedia: {
      facebook: 'https://www.facebook.com/p/Tasty-Wings-Sandwiches-100057388152378/',
      instagram: 'https://www.instagram.com/tastywingsandsandwiches/',
      twitter: 'https://twitter.com/tastywings'
    }
  })

  const [menuItems, setMenuItems] = useState([
    // Wings
    {
      id: 1,
      name: 'Classic Buffalo Wings',
      description: 'Traditional buffalo wings with our signature hot sauce',
      price: 12.99,
      category: 'Wings',
      image: '/images/buffalo-wings.jpg',
      spiceLevel: 'Medium',
      popular: true,
      available: true
    },
    {
      id: 2,
      name: 'BBQ Wings',
      description: 'Sweet and smoky BBQ glazed wings',
      price: 12.99,
      category: 'Wings',
      image: '/images/bbq-wings.jpg',
      spiceLevel: 'Mild',
      popular: true,
      available: true
    },
    {
      id: 3,
      name: 'Honey Garlic Wings',
      description: 'Sweet honey with roasted garlic flavor',
      price: 13.99,
      category: 'Wings',
      image: '/images/honey-garlic-wings.jpg',
      spiceLevel: 'Mild',
      popular: false,
      available: true
    },
    {
      id: 4,
      name: 'Spicy Korean Wings',
      description: 'Korean-style wings with gochujang glaze',
      price: 14.99,
      category: 'Wings',
      image: '/images/korean-wings.jpg',
      spiceLevel: 'Hot',
      popular: true,
      available: true
    },
    {
      id: 5,
      name: 'Lemon Pepper Wings',
      description: 'Crispy wings with zesty lemon pepper seasoning',
      price: 12.99,
      category: 'Wings',
      image: '/images/lemon-pepper-wings.jpg',
      spiceLevel: 'Mild',
      popular: false,
      available: true
    },
    {
      id: 6,
      name: 'Nashville Hot Wings',
      description: 'Fiery Nashville-style hot chicken wings',
      price: 14.99,
      category: 'Wings',
      image: '/images/nashville-wings.jpg',
      spiceLevel: 'Extra Hot',
      popular: false,
      available: true
    },
    
    // Sides
    {
      id: 7,
      name: 'Loaded Fries',
      description: 'Crispy fries topped with cheese, bacon, and green onions',
      price: 8.99,
      category: 'Sides',
      image: '/images/loaded-fries.jpg',
      popular: true,
      available: true
    },
    {
      id: 8,
      name: 'Onion Rings',
      description: 'Golden crispy beer-battered onion rings',
      price: 6.99,
      category: 'Sides',
      image: '/images/onion-rings.jpg',
      popular: false,
      available: true
    },
    {
      id: 9,
      name: 'Mac & Cheese',
      description: 'Creamy three-cheese macaroni',
      price: 7.99,
      category: 'Sides',
      image: '/images/mac-cheese.jpg',
      popular: true,
      available: true
    },
    {
      id: 10,
      name: 'Coleslaw',
      description: 'Fresh and creamy coleslaw',
      price: 4.99,
      category: 'Sides',
      image: '/images/coleslaw.jpg',
      popular: false,
      available: true
    },
    
    // Drinks
    {
      id: 11,
      name: 'Craft Beer',
      description: 'Local craft beer selection',
      price: 5.99,
      category: 'Drinks',
      image: '/images/craft-beer.jpg',
      popular: true,
      available: true
    },
    {
      id: 12,
      name: 'Fresh Lemonade',
      description: 'House-made fresh lemonade',
      price: 3.99,
      category: 'Drinks',
      image: '/images/lemonade.jpg',
      popular: false,
      available: true
    },
    {
      id: 13,
      name: 'Iced Tea',
      description: 'Sweet or unsweetened iced tea',
      price: 2.99,
      category: 'Drinks',
      image: '/images/iced-tea.jpg',
      popular: false,
      available: true
    },
    
    // Desserts
    {
      id: 14,
      name: 'Chocolate Brownie',
      description: 'Warm chocolate brownie with vanilla ice cream',
      price: 6.99,
      category: 'Desserts',
      image: '/images/brownie.jpg',
      popular: true,
      available: true
    },
    {
      id: 15,
      name: 'Cheesecake',
      description: 'New York style cheesecake with berry compote',
      price: 7.99,
      category: 'Desserts',
      image: '/images/cheesecake.jpg',
      popular: false,
      available: true
    }
  ])

  const [categories] = useState([
    'Wings',
    'Sides', 
    'Drinks',
    'Desserts'
  ])

  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)

  // Check if restaurant is currently open
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date()
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
      const currentTime = now.getHours() * 100 + now.getMinutes()
      
      // For demo purposes, assume always open
      setIsOpen(true)
    }

    checkIfOpen()
    const interval = setInterval(checkIfOpen, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const getMenuItemsByCategory = (category) => {
    return menuItems.filter(item => item.category === category && item.available)
  }

  const getPopularItems = () => {
    return menuItems.filter(item => item.popular && item.available)
  }

  const getMenuItem = (id) => {
    return menuItems.find(item => item.id === parseInt(id))
  }

  const updateMenuItem = (id, updates) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    )
  }

  const value = {
    businessInfo,
    setBusinessInfo,
    menuItems,
    setMenuItems,
    categories,
    isOpen,
    setIsOpen,
    loading,
    setLoading,
    getMenuItemsByCategory,
    getPopularItems,
    getMenuItem,
    updateMenuItem
  }

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  )
} 