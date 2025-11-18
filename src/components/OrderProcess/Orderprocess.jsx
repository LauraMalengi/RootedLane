import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderProcess.css';

const OrderProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  return (
    <div className="order-process-page">
      <div className="order-success-card">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        <p className="order-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="order-details">
          <div className="order-detail-row">
            <span>Order Number:</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="order-detail-row">
            <span>Total Amount:</span>
            <strong>R {total?.toLocaleString()}</strong>
          </div>
          <div className="order-detail-row">
            <span>Status:</span>
            <span className="status-badge">Processing</span>
          </div>
        </div>

        <div className="order-info">
          <p>
            <i className="fas fa-envelope"></i>
            A confirmation email has been sent to your registered email address.
          </p>
          <p>
            <i className="fas fa-truck"></i>
            Your order will be delivered within 5-7 business days.
          </p>
          <p>
            <i className="fas fa-phone"></i>
            For any queries, contact us at <strong>067 800 0672</strong>
          </p>
        </div>

        <div className="order-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
          <button className="btn-secondary" onClick={() => navigate('/orders')}>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;