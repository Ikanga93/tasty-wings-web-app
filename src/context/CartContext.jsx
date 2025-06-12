import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: ''
  })
  const [orderType, setOrderType] = useState('delivery') // 'delivery' or 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'cash'

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tastyWingsCart')
    const savedCustomerInfo = localStorage.getItem('tastyWingsCustomer')
    const savedOrderType = localStorage.getItem('tastyWingsOrderType')
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    
    if (savedCustomerInfo) {
      try {
        setCustomerInfo(JSON.parse(savedCustomerInfo))
      } catch (error) {
        console.error('Error loading customer info from localStorage:', error)
      }
    }
    
    if (savedOrderType) {
      setOrderType(savedOrderType)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tastyWingsCart', JSON.stringify(cartItems))
  }, [cartItems])

  // Save customer info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tastyWingsCustomer', JSON.stringify(customerInfo))
  }, [customerInfo])

  // Save order type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tastyWingsOrderType', orderType)
  }, [orderType])

  const addToCart = (item, quantity = 1, customizations = {}) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity,
      customizations,
      cartId: Date.now() + Math.random() // Unique ID for cart item
    }

    setCartItems(prev => {
      // Check if exact same item with same customizations exists
      const existingItemIndex = prev.findIndex(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prev]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item to cart
        return [...prev, cartItem]
      }
    })
  }

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId))
  }

  const updateCartItemQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId)
      return
    }

    setCartItems(prev => 
      prev.map(item => 
        item.cartId === cartId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('tastyWingsCart')
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const getTaxAmount = () => {
    const subtotal = getCartTotal()
    const taxRate = 0.08 // 8% tax rate
    return subtotal * taxRate
  }

  const getDeliveryFee = () => {
    if (orderType === 'pickup') return 0
    const subtotal = getCartTotal()
    if (subtotal >= 25) return 0 // Free delivery over $25
    return 2.99
  }

  const getFinalTotal = () => {
    return getCartTotal() + getTaxAmount() + getDeliveryFee()
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const updateCustomerInfo = (updates) => {
    setCustomerInfo(prev => ({ ...prev, ...updates }))
  }

  const isCartEmpty = () => cartItems.length === 0

  const getOrderSummary = () => {
    return {
      items: cartItems,
      subtotal: getCartTotal(),
      tax: getTaxAmount(),
      deliveryFee: getDeliveryFee(),
      total: getFinalTotal(),
      itemCount: getCartItemCount(),
      orderType,
      customerInfo,
      paymentMethod
    }
  }

  const value = {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    customerInfo,
    setCustomerInfo,
    orderType,
    setOrderType,
    paymentMethod,
    setPaymentMethod,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getTaxAmount,
    getDeliveryFee,
    getFinalTotal,
    openCart,
    closeCart,
    updateCustomerInfo,
    isCartEmpty,
    getOrderSummary
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
} 