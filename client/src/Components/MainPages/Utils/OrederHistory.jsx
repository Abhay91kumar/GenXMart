import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import '../Css/FinalCss/Order.css'

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/payment/user', {
          headers: { Authorization: token }
        });
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="order-history">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h4>🧾 Order ID: {order.paymentID}</h4>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div>
              <h5>📦 Items:</h5>
              <ul>
                {order.cart.map((item, i) => (
                  <li key={i}>{item.title} × {item.quantity} (₹{item.price})</li>
                ))}
              </ul>
            </div>
            <div>
              <h5>📍 Shipping Address:</h5>
              <p>{order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}</p>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
