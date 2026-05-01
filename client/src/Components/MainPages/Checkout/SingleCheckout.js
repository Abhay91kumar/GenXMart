import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/FinalCss/Checkout.css';
import CheckoutUI from './CheckoutUI';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { GlobalState } from '../../../GlobalState';

const server = process.env.REACT_APP_SERVER;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const SingleCheckout = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const globalState = useContext(GlobalState);
  const [token] = globalState.token;
  const [user] = globalState.userAPI.user;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

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

    if (!state?.item) {
      return alert("No product found for checkout");
    }

    try {
      const response = await axios.post(
        `${server}/api/payment`,
        {
          cartItems: [state.item],
          address: selectedAddress,
          user_id: user._id
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

  if (!state?.item) {
    return (
      <div className="checkout-container">
        <h2>No item found</h2>
        <button onClick={() => navigate('/cart')}>
          Go Back to Cart
        </button>
      </div>
    );
  }

  const { item } = state;

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      <div className="checkout-item">
        <img src={item.image?.url} alt={item.title} width="120" />

        <div className="checkout-detail">
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price per item: ₹{item.price}</p>
          <h3>Total: ₹{item.totalPrice}</h3>
        </div>
      </div>

      <CheckoutUI
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        handlePayment={handlePayment}
      />

    </div>
  );
};

export default SingleCheckout;