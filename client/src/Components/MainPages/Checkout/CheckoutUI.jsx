import React from 'react';
import '../Css/FinalCss/Payment.css'

const CheckoutUI = ({ address, handleChange, handlePayment }) => {
  return (
    <div>
      <h3>Shipping Address</h3>
      <div className="address-form">
        <input
          type="text" name="street"  placeholder="Street" 
          value={address.street} onChange={handleChange}
        />
        <input
          type="text" name="city" placeholder="City" 
          value={address.city} onChange={handleChange}
        />
        <input
          type="text"  name="state" placeholder="State"
          value={address.state} onChange={handleChange}
        />
        <input
          type="text"  name="zipcode"  placeholder="Zipcode"
          value={address.zipcode} onChange={handleChange}
        />
        <input
          type="text"  name="country"  placeholder="Country"
          value={address.country}  onChange={handleChange}
        />
      </div>

      <button className="checkout-button" onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default CheckoutUI;
