import React from 'react';
import '../Css/FinalCss/Payment.css';

const CheckoutUI = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
  handlePayment
}) => {

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const addr = addresses.find(a => a._id === selectedId);
    setSelectedAddress(addr);
  };

  return (
    <div className="checkout-section">

      <h3>Select Address</h3>

      {addresses.length === 0 ? (
        <p>
          No address found. <a href="/address">Add Address</a>
        </p>
      ) : (
        <>
          <select
            className="address-dropdown"
            onChange={handleSelect}
            value={selectedAddress?._id || ""}
          >
            <option value="">-- Select Address --</option>

            {addresses.map(addr => (
              <option key={addr._id} value={addr._id}>
                {addr.fullName} - {addr.city}
              </option>
            ))}
          </select>

          {selectedAddress && (
            <div className="address-display">
              <h4>{selectedAddress.fullName}</h4>

              <p>
                {selectedAddress.house}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
              </p>

              <p>📞 {selectedAddress.mobile}</p>
            </div>
          )}
        </>
      )}

      <a href="/address" className="manage-link">
        Manage Addresses
      </a>

      <button className="checkout-button" onClick={handlePayment}>
        Proceed to Payment
      </button>

    </div>
  );
};

export default CheckoutUI;