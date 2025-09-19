import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderProcess.css";

export default function OrderProcess() {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  return (
    <div className="order-process-container">
      <h1>Order Process</h1>
      {orderId && total ? (
        <>
          <p>Order ID: {orderId}</p>
          <p>Total: R {total}</p>
        </>
      ) : (
        <p>No order details found.</p>
      )}

      <h2>What Happens After You Place an Order?</h2>
      <ol>
        <li>
          <strong>Order Confirmation:</strong> You’ll receive an email confirming your purchase.
        </li>
        <li><strong>Payment Processing:</strong> Your payment is processed securely.</li>
        <li><strong>Order Fulfillment:</strong> We pick and pack your order at our warehouse.</li>
        <li><strong>Shipping & Tracking:</strong> You’ll receive tracking details via email.</li>
        <li><strong>Delivery:</strong> The package arrives at your chosen address.</li>
        <li><strong>Post-Purchase Communication:</strong> We may send updates or request a review.</li>
      </ol>
    </div>
  );
}

