import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Success.css'

const Success = () => {
  useEffect(() => {
    localStorage.removeItem('cart'); 
  }, []);

  return (
    <div className="success-container">
      <h2>✅ Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <Link to="/history" className="btn">View Your Orders</Link>
    </div>
  );
};

export default Success;
