import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; 

const Checkout = ({ cartItems = [], updateCartItemQuantity, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const [orderId] = useState(Math.floor(Math.random() * 100000));
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = (e) => {
  e.preventDefault();
  
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Save order to localStorage
  const order = {
    orderId,
    items: cartItems,
    total,
    date: new Date().toISOString(),
    ...formData
  };
  
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // ✅ Call the clearCart prop function
  if (clearCart) {
    clearCart();
  }
  
  // Navigate to order confirmation
  navigate("/order-process", { state: { orderId, total } });
};

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#ccc' }}></i>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <button onClick={() => navigate('/')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-left">
          <h2>Checkout</h2>
          
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-section">
              <h3><i className="fas fa-shipping-fast"></i> Shipping Information</h3>
              <div className="form-row">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name" 
                  required 
                />
              </div>
              <div className="form-row">
                <input 
                  type="number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number" 
                  required 
                />
              </div>
              <div className="form-row">
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address" 
                  required 
                />
              </div>
              <div className="form-row-split">
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City" 
                  required 
                />
                <input 
                  type="number" 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3><i className="fas fa-credit-card"></i> Payment Details</h3>
              <div className="form-row">
                <input 
                  type="Number" 
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Card Number" 
                  maxLength="16"
                  required 
                />
              </div>
              <div className="form-row-split">
                <input 
                  type="text" 
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY" 
                  maxLength="5"
                  required 
                />
                <input 
                  type="Number" 
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="CVV" 
                  maxLength="3"
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="place-order-btn">
              <i className="fas fa-lock"></i> Place Order - R {total.toLocaleString()}
            </button>
          </form>
        </div>

        <div className="checkout-right">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">R {item.price.toLocaleString()}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-total">
                    <p>R {(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>R {subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>R {shipping.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>R {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;