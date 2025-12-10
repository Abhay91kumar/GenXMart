import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [endpointType, setEndpointType] = useState('');
    const [item, setItem] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const types = ['product', 'mobile', 'fashion'];
            for (const type of types) {
                try {
                    const res = await axios.get(`/api/${type}/${id}`);
                    if (res.data) {
                        setItem(res.data);
                        setEndpointType(type);
                        return;
                    }
                } catch (err) { }
            }
            alert("Item not found");
        };

        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        if (!endpointType) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete this ${endpointType}?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/${endpointType}/${id}`);
            alert(`${endpointType} deleted successfully`);
            navigate('/'); // or to admin/items page
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete item");
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div className="delete-container">
            <h2 className="delete-heading">Delete {endpointType}</h2>
            <div className="delete-summary">
                <p>Are you sure you want to delete:</p>
                <ul>
                    <li><strong>Title:</strong> {item.title}</li>
                    <li><strong>Price:</strong> ₹{item.price}</li>
                    <li><strong>Description:</strong> {item.description}</li>
                </ul>
            </div>
            <button className="delete-button" onClick={handleDelete}>Confirm Delete</button>
        </div>
    );
}
 export default DeleteItem;
