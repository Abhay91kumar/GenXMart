import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutUI from './CheckoutUI';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [user] = state.userAPI.user;
  const [token] = state.token;
  console.log("Logged in user ID:", user.id);
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePayment = async () => {
    if (Object.values(address).some(val => val.trim() === '')) {
      return alert('Please fill in all address fields.');
    }

    try {
      const response = await axios.post('/api/payment', {
        cartItems: cart,
        address
      }, {
        headers: {
          Authorization: token
        }
      });


      const sessionId = response.data.id;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      alert(errMsg);
    }
  };

  const cartWithTotalPrice = cart.map(item => ({
    ...item,
    totalPrice: item.price * item.quantity,
  }));
return (
  <div className="checkout-container">
      <h2>Checkout Summary</h2>
      {cartWithTotalPrice.map((item, index) => (
        <div className="checkout-item" key={index}>
          <img src={item.image?.url} alt={item.title} width="80" />
          <div className="checkout-detail">
            <h4>{item.title}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Total: ₹ {item.totalPrice}</p>
          </div>
        </div>
      ))}
      <h3>Grand Total: ₹ {totalAmount}</h3>
    <CheckoutUI
      totalAmount={totalAmount}
      address={address}
      handleChange={handleChange}
      handlePayment={handlePayment}
    />
    </div>
  );

};

export default Checkout;
