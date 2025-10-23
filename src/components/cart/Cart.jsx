import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cartItems, onClose, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Close cart with Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    // Prevent body scroll when cart is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Close cart when clicking overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('cart-overlay')) {
      onClose();
    }
  };

  const handleCheckout = () => {
    onClose(); // Close cart before navigating
    navigate("/checkout");
  };

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-panel">
        {/* Enhanced Close Button */}
        <button className="close-btn" onClick={onClose} aria-label="Close cart">
          ❌
        </button>

        {/* Cart Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            🛒 Your Cart
          </h2>
          <span className="cart-count">{cartItems.length} items</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">
              🛒
            </div>
            <h3>Your cart is empty</h3>
            <p>Add some amazing products to get started!</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              ⬅️ Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">R {item.price.toLocaleString()}</p>
                    
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn decrease"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        ➖
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        ➕
                      </button>
                    </div>
                    
                    <div className="item-total">
                      R {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                  
                  <button 
                    className="remove-btn" 
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>R {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>R {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <button className="continue-shopping-btn outline" onClick={onClose}>
                  ⬅️ Continue Shopping
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  🔒 Secure Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;