import React from "react";
import "./Chexkout.css"; 

const Checkout = ({ cartItems = [] }) => (
  <div className="checkout-page">
    <h2>Checkout</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} — R {item.price * item.quantity}
          </li>
        ))}
      </ul>
    )}
    {/* Add payment and address form here if needed */}
  </div>
);

export default Checkout;
