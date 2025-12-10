import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
    const [type, setType] = useState('product'); // default
    const [formData, setFormData] = useState({
        item_id: '',
        title: '',
        price: '',
        description: '',
        contain: '',
        brand: '',
        category: '',
        image: { url: '' },
        specs: {
            ram: '',
            storage: '',
            battery: '',
            camera: '',
            processor: ''
        }
    });

    const handleCreate = async () => {
        const payload = { ...formData };

        if (type === 'product') payload.product_id = payload.item_id;
        else if (type === 'mobile') payload.mobile_id = payload.item_id;
        else if (type === 'fashion') payload.fashion_id = payload.item_id;

        delete payload.item_id; 

        try {
            const res = await axios.post(`/api/${type}`, payload);
            if (res.data) {
                alert(`${type} item created successfully`);
            }
        } catch (err) {
            console.error("Create failed", err);
            alert("Failed to create item");
        }
    };

    return (
        <div className="create-item-form">
            <h2>Add New Item</h2>

            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="product">Product</option>
                <option value="mobile">Mobile</option>
                <option value="fashion">Fashion</option>
            </select>

            <label>ID:</label>
            <input
                type="text"
                value={formData.item_id}
                onChange={(e) => setFormData({ ...formData, item_id: e.target.value })}
            />

            <label>Title:</label>
            <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <label>Price:</label>
            <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <label>Description:</label>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {type === 'product' && (
                <>
                    <label>Contain:</label>
                    <input
                        type="text"
                        value={formData.contain}
                        onChange={(e) => setFormData({ ...formData, contain: e.target.value })}
                    />
                </>
            )}

            {type === 'mobile' && (
                <>
                    <label>Brand:</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />

                    <label>Specs:</label>
                    <input
                        type="text"
                        placeholder="RAM"
                        value={formData.specs.ram}
                        onChange={(e) =>
                            setFormData({ ...formData, specs: { ...formData.specs, ram: e.target.value } })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Storage"
                        value={formData.specs.storage}
                        onChange={(e) =>
                            setFormData({ ...formData, specs: { ...formData.specs, storage: e.target.value } })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Battery"
                        value={formData.specs.battery}
                        onChange={(e) =>
                            setFormData({ ...formData, specs: { ...formData.specs, battery: e.target.value } })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Camera"
                        value={formData.specs.camera}
                        onChange={(e) =>
                            setFormData({ ...formData, specs: { ...formData.specs, camera: e.target.value } })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Processor"
                        value={formData.specs.processor}
                        onChange={(e) =>
                            setFormData({ ...formData, specs: { ...formData.specs, processor: e.target.value } })
                        }
                    />
                </>
            )}

            <label>Category:</label>
            <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            <label>Image URL:</label>
            <input
                type="text"
                value={formData.image.url}
                onChange={(e) =>
                    setFormData({ ...formData, image: { ...formData.image, url: e.target.value } })
                }
            />

            <button onClick={handleCreate}>Create</button>
        </div>
    );
};

export default CreateItem;
