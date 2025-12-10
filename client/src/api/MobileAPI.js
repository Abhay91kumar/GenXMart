import { useEffect, useState } from 'react';
import axios from 'axios';

const MobileAPI = () => {

    const [mobiles, setMobiles] = useState([]);

    const getMobiles = async () => {
        try {
            const res = await axios.get('/api/mobile');
            // console.log('Mobile:', res.data);
            setMobiles(res.data.mobiles); 
        } catch (err) {
            console.error('Error fetching mobile data:', err);
        }
    }

    useEffect(() => {
        getMobiles();
    }, []);

    return {
        mobiles: [mobiles, setMobiles]
    };
}

export default MobileAPI;
