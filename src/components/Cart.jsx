import React from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateCartItemQuantity,
    removeFromCart,
    getCartTotal,
    getTaxAmount,
    getDeliveryFee,
    getFinalTotal,
    isCartEmpty,
    orderType
  } = useCartContext()

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart()
    }
  }

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId)
    } else {
      updateCartItemQuantity(cartId, newQuantity)
    }
  }

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }

  if (!isCartOpen) return null

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-sidebar">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={24} />
            <h2>Your Order</h2>
          </div>
          <button 
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {isCartEmpty() ? (
            <div className="cart-empty">
              <div className="empty-icon">🍗</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious wings to get started!</p>
              <Link to="/menu" className="btn" onClick={closeCart} style={{ backgroundColor: '#000', color: '#fff' }}>
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              <div className="order-type">
                <span className="order-type-label">Order Type:</span>
                <span className="order-type-value">
                  🏪 Pickup
                </span>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-food.jpg'
                        }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">{formatPrice(item.price)}</p>
                      
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatPrice(getTaxAmount())}</span>
                </div>
                
                {orderType === 'delivery' && (
                  <div className="summary-row">
                    <span>
                      Delivery Fee
                      {getCartTotal() >= 25 && (
                        <small className="free-delivery"> (Free over $25!)</small>
                      )}
                    </span>
                    <span>{formatPrice(getDeliveryFee())}</span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(getFinalTotal())}</span>
                </div>
              </div>

              <div className="cart-actions">
                <Link 
                  to="/checkout" 
                  className="btn btn-lg checkout-btn"
                  onClick={closeCart}
                  style={{ backgroundColor: '#000', color: '#fff', border: 'none' }}
                >
                  Proceed to Checkout
                </Link>
                <button 
                  className="btn continue-shopping"
                  onClick={closeCart}
                  style={{ backgroundColor: '#fff', color: '#000', border: '1px solid #000', borderRadius: '4px' }}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart 