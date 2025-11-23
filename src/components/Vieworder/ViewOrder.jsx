// components/ViewOrders/ViewOrders.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewOrder.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      // Sort orders by date (newest first)
      const sortedOrders = savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (orderDate) => {
    const orderTime = new Date(orderDate);
    const now = new Date();
    const diffHours = (now - orderTime) / (1000 * 60 * 60);

    if (diffHours < 1) return { status: 'Processing', color: '#ffa500' };
    if (diffHours < 24) return { status: 'Shipped', color: '#007bff' };
    if (diffHours < 72) return { status: 'In Transit', color: '#6f42c1' };
    return { status: 'Delivered', color: '#28a745' };
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const printOrder = (order) => {
    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Order Receipt - #${order.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .order-info { margin: 20px 0; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f5f5f5; }
            .totals { margin-top: 20px; text-align: right; }
            .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fashion Store</h1>
            <h2>Order Receipt</h2>
          </div>
          <div class="order-info">
            <p><strong>Order ID:</strong> #${order.orderId}</p>
            <p><strong>Date:</strong> ${formatDate(order.date)}</p>
            <p><strong>Customer:</strong> ${order.customerInfo?.fullName || 'N/A'}</p>
          </div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>R ${item.price.toLocaleString()}</td>
                  <td>${item.quantity}</td>
                  <td>R ${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <h3>Total: R ${order.total.toLocaleString()}</h3>
          </div>
          <div class="thank-you">
            <p>Thank you for your purchase!</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) {
    return (
      <div className="view-orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View your order history and track your purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-box-open"></i>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <button 
              onClick={() => navigate('/')}
              className="start-shopping-btn"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const status = getOrderStatus(order.date);
              return (
                <div 
                  key={order.orderId} 
                  className="order-card"
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order.orderId}</h3>
                      <p className="order-date">{formatDate(order.date)}</p>
                    </div>
                    <div 
                      className="order-status"
                      style={{ backgroundColor: status.color }}
                    >
                      {status.status}
                    </div>
                  </div>

                  <div className="order-details-preview">
                    <div className="order-items-preview">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="preview-item">
                          <img src={item.image} alt={item.name} />
                          <span>{item.name}</span>
                          {index === 0 && order.items.length > 2 && (
                            <span className="more-items">+{order.items.length - 2} more</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-summary-preview">
                      <div className="summary-item">
                        <span>Items:</span>
                        <span>{calculateTotalItems(order.items)}</span>
                      </div>
                      <div className="summary-item total">
                        <span>Total:</span>
                        <span>R {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button 
                      className="view-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="print-receipt-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        printOrder(order);
                      }}
                    >
                      <i className="fas fa-print"></i> Print
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <>
          <div className="modal-overlay" onClick={closeOrderDetails}></div>
          <div className="order-details-modal">
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.orderId}</h2>
              <button className="close-modal" onClick={closeOrderDetails}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="order-info-section">
                <div className="info-group">
                  <h4>Order Information</h4>
                  <p><strong>Order Date:</strong> {formatDate(selectedOrder.date)}</p>
                  <p><strong>Order Status:</strong> 
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getOrderStatus(selectedOrder.date).color }}
                    >
                      {getOrderStatus(selectedOrder.date).status}
                    </span>
                  </p>
                </div>

                <div className="info-group">
                  <h4>Shipping Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customerInfo?.fullName || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedOrder.customerInfo?.address || 'N/A'}</p>
                  <p><strong>City:</strong> {selectedOrder.customerInfo?.city || 'N/A'}</p>
                  <p><strong>Postal Code:</strong> {selectedOrder.customerInfo?.postalCode || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customerInfo?.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="order-items-section">
                <h4>Order Items ({calculateTotalItems(selectedOrder.items)})</h4>
                <div className="items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p className="item-price">R {item.price.toLocaleString()} each</p>
                      </div>
                      <div className="item-quantity">
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="item-total">
                        <strong>R {(item.price * item.quantity).toLocaleString()}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-total-section">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>R {(selectedOrder.total - 100).toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>R 100.00</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>R {selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="print-btn"
                onClick={() => printOrder(selectedOrder)}
              >
                <i className="fas fa-print"></i> Print Receipt
              </button>
              <button 
                className="close-btn"
                onClick={closeOrderDetails}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewOrder;