import React from 'react';
// import '../Css/AdminCss/EditForm.css'

const EditItemForm = ({ item, formData, setFormData, handleUpdate, endpointType }) => {
    return (
        <div className="edit-item-form">
            <h2>Edit: {item.title}</h2>

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

            {endpointType === 'product' && (
                <>
                    <label>Contain:</label>
                    <input
                        type="text"
                        value={formData.contain}
                        onChange={(e) => setFormData({ ...formData, contain: e.target.value })}
                    />
                </>
            )}

            {endpointType === 'mobile' && (
                <>
                    <label>Brand:</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />

                    <label>Specs:</label>
                    {['ram', 'storage', 'battery', 'camera', 'processor'].map((spec) => (
                        <input
                            key={spec}
                            type="text"
                            placeholder={spec.charAt(0).toUpperCase() + spec.slice(1)}
                            value={formData.specs[spec]}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    specs: { ...formData.specs, [spec]: e.target.value },
                                })
                            }
                        />
                    ))}
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

            <button onClick={handleUpdate}>Save</button>
        </div>
    );
};

export default EditItemForm;
