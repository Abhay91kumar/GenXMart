import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import CheckoutUI from './CheckoutUI';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const server = process.env.REACT_APP_SERVER;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {

  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [token] = state.token;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${server}/api/address`, {
          headers: { Authorization: token }
        });

        const data = res.data.addresses;
        setAddresses(data);

        const defaultAddr = data.find(a => a.isDefault);
        setSelectedAddress(defaultAddr || data[0]);

      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    if (token) fetchAddress();
  }, [token]);

  const handlePayment = async () => {

    if (!selectedAddress) {
      return alert("Please select an address");
    }

    try {
      const response = await axios.post(
        `${server}/api/payment`,
        {
          cartItems: cart,
          address: selectedAddress
        },
        {
          headers: { Authorization: token }
        }
      );

      const sessionId = response.data?.id;

      if (!sessionId) {
        return alert("Payment session not created. Try again.");
      }

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId
      });

      if (error) {
        alert(error.message);
      }

    } catch (error) {
      alert(error.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="checkout-container">

      <h2>Checkout Summary</h2>

      {cart.map((item, index) => (
        <div className="checkout-item" key={index}>
          <img src={item.image?.url} alt={item.title} width="80" />

          <div className="checkout-detail">
            <h4>{item.title}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Total: ₹ {item.price * item.quantity}</p>
          </div>
        </div>
      ))}

      <h3>Grand Total: ₹ {totalAmount}</h3>

      <CheckoutUI
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        handlePayment={handlePayment}
      />

    </div>
  );
};

export default Checkout;