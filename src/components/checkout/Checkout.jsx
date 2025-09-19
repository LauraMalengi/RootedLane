import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; 

const Checkout = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const [orderId] = useState(Math.floor(Math.random() * 100000));
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Here you would normally process the order
    // After success, navigate to OrderProcess page
    navigate("/order-process", { state: { orderId, total } });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} x {item.quantity} — R {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <div className="total-amount">
              <strong>Total: R {total}</strong>
            </div>
          </div>
          
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-section">
              <h3>Shipping Information</h3>
              <input type="text" placeholder="Full Name" required />
              <input type="text" placeholder="Address" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Postal Code" required />
            </div>
            
            <div className="form-section">
              <h3>Payment Details</h3>
              <input type="text" placeholder="Card Number" required />
              <div className="card-details">
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVV" required />
              </div>
            </div>
            
            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
