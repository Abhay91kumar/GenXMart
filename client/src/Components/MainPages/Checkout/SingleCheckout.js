import React, { useState, useContext,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/FinalCss/Checkout.css';
import CheckoutUI from './CheckoutUI';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { GlobalState } from '../../../GlobalState'; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const SingleCheckout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const globalState = useContext(GlobalState); 
  const [token] = globalState.token;
  const [user] = globalState.userAPI.user;

  console.log("Logged in user ID:", user?._id); 
useEffect(() => {

}, [token, user]);
  
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePayment = async () => {
    if (Object.values(address).some(val => val.trim() === '')) {
      return alert('Please fill in all address fields.');
    }

    try {
      const response = await axios.post('/api/payment', {
        cartItems: [state.item],
        address,
        user_id: user._id, 
      }, {
        headers: {
          Authorization: token
        }
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      alert(errMsg);
    }
  };

  if (!state?.item) {
    return (
      <div className="checkout-container">
        <h2>No item found</h2>
        <button onClick={() => navigate('/cart')}>Go Back to Cart</button>
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
        address={address}
        handleChange={handleChange}
        handlePayment={handlePayment}
      />
    </div>
  );
};

export default SingleCheckout;
