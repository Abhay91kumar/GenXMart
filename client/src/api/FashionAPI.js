import { useEffect, useState } from 'react';
import axios from 'axios';

const FashionAPI = () => {

    const [fashions, setFashions] = useState([]);

    const getFashions = async () => {
        try {
            const res = await axios.get('/api/fashion');
            // console.log('Fashion:', res.data);
            setFashions(res.data.fashions); 
        } catch (err) {
            console.error('Error fetching fashion data:', err);
        }
    }

    useEffect(() => {
        getFashions();
    }, []);

    return {
        fashions: [fashions, setFashions]
    };
}

export default FashionAPI;
