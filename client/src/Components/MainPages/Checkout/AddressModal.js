import React, { useState } from "react";
import axios from "axios";
import "../Css/addressCss.css";

const server = process.env.REACT_APP_SERVER;

function AddressModal({
    editData,
    closeModal,
    fetchAddress
}) {

    const [form, setForm] = useState(
        editData || {
            fullName: "",
            mobile: "",
            pincode: "",
            state: "",
            city: "",
            area: "",
            house: "",
            landmark: ""
        }
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        };

        if (editData) {
            await axios.put(
                `${server}/api/address/${editData._id}`,
                form,
                config
            );
        } else {
            await axios.post(
                `${server}/api/address`,
                form,
                config
            );
        }

        fetchAddress();
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">

                <div className="modal-header">
                    <h3>{editData ? "Edit Address" : "Add Address"}</h3>
                    <span className="close-btn" onClick={closeModal}>×</span>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">

                    <div className="form-group">
                        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
                        <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
                        <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                        <input name="area" placeholder="Area" value={form.area} onChange={handleChange} />
                    </div>

                    <input name="house" placeholder="House / Flat" value={form.house} onChange={handleChange} />

                    <input name="landmark" placeholder="Landmark (Optional)" value={form.landmark} onChange={handleChange} />

                    <button type="submit" className="save-btn">
                        {editData ? "Update Address" : "Save Address"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default AddressModal;