import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import '../Css/FinalCss/Order.css';

const server = process.env.REACT_APP_SERVER;

const OrderHistory = () => {

  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${server}/api/payment/user`, {
          headers: { Authorization: token }
        });
        setOrders(res.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="order-history">

      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">

            <div className="order-header">
              <h4>Order ID: {order.paymentID}</h4>
              <span>₹{order.total}</span>
            </div>

            <p className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="order-section">
              <h5>Items</h5>
              <ul>
                {order.cart.map((item, i) => (
                  <li key={i}>
                    {item.title} × {item.quantity} (₹{item.price})
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-section">
              <h5>Shipping Address</h5>

              {order.address && (
                <div className="address-box">

                  <p className="name">
                    {order.address.fullName}
                  </p>

                  <p>
                    {order.address.house}, {order.address.area}
                  </p>

                  <p>
                    {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>

                  <p>
                    📞 {order.address.mobile}
                  </p>

                </div>
              )}

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default OrderHistory;