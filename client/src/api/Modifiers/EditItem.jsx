
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditItemForm from '../../Components/MainPages/Utils/EditItemForm'; 

const EditItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [endpointType, setEndpointType] = useState('');
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

    useEffect(() => {
        const fetchItem = async () => {
            const types = ['product', 'mobile', 'fashion'];
            for (const type of types) {
                try {
                    const res = await axios.get(`/api/${type}/${id}`);
                    if (res.data) {
                        setItem(res.data);
                        setEndpointType(type);
                        const idField = res.data.product_id || res.data.mobile_id || res.data.fashion_id || '';

                        setFormData({
                            item_id: idField,
                            title: res.data.title || '',
                            price: res.data.price || '',
                            description: res.data.description || '',
                            contain: res.data.contain || '',
                            brand: res.data.brand || '',
                            category: res.data.category || '',
                            image: res.data.image || { url: '' },
                            specs: res.data.specs || {
                                ram: '',
                                storage: '',
                                battery: '',
                                camera: '',
                                processor: ''
                            }
                        });
                        return;
                    }
                } catch (err) {}
            }
            alert("Item not found");
        };

        fetchItem();
    }, [id]);

    const handleUpdate = async () => {
        const payload = { ...formData };
        if (endpointType === 'product') payload.product_id = payload.item_id;
        else if (endpointType === 'mobile') payload.mobile_id = payload.item_id;
        else if (endpointType === 'fashion') payload.fashion_id = payload.item_id;

        delete payload.item_id;

        try {
            const res = await axios.put(`/api/${endpointType}/${id}`, payload);
            if (res.data) {
                alert(`${endpointType} updated successfully`);
            }
        } catch (err) {
            console.error("Update failed", err);
            alert("Failed to update");
        }
    };

    if (!item) return <p>Loading...</p>;

    return (
        <EditItemForm
            item={item}
            formData={formData}
            setFormData={setFormData}
            handleUpdate={handleUpdate}
            endpointType={endpointType}
        />
    );
};

export default EditItem;
