import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import AddressModal from "./AddressModal";

const server = process.env.REACT_APP_SERVER;

function Address() {

    const state = useContext(GlobalState);
    const [token] = state.token;

    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // ✅ MOVE OUTSIDE
    const fetchAddress = async () => {
        try {
            const res = await axios.get(`${server}/api/address`, {
                headers: { Authorization: token }
            });

            setAddresses(res.data.addresses);

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    useEffect(() => {
        if (token) fetchAddress();
    }, [token]);

    // ✅ DELETE FUNCTION
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${server}/api/address/${id}`, {
                headers: { Authorization: token }
            });

            fetchAddress(); // refresh

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="address-page">

            <div className="address-header">
                <h2>My Addresses</h2>

                <button className="add-btn" onClick={() => {
                    setEditData(null);
                    setShowModal(true);
                }}>
                    + Add New Address
                </button>
            </div>

            {
                addresses.length === 0 ? (
                    <p className="empty-text">No address found.</p>
                ) : (
                    <div className="address-grid">
                        {addresses.map(item => (
                            <div key={item._id} className="address-card">

                                <div className="card-top">
                                    <h4>{item.fullName}</h4>
                                    {item.isDefault && <span className="default-badge">Default</span>}
                                </div>

                                <p className="address-text">
                                    {item.house}, {item.area}, {item.city}, {item.state} - {item.pincode}
                                </p>

                                <p className="mobile">{item.mobile}</p>

                                <div className="card-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setEditData(item);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            if (window.confirm("Delete this address?")) {
                                                handleDelete(item._id);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )
            }

            {
                showModal &&
                <AddressModal
                    editData={editData}
                    fetchAddress={fetchAddress}
                    closeModal={() => setShowModal(false)}
                />
            }

        </div>
    );
}

export default Address;