import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAPI = () => {

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const res = await axios.get('/api/product');
            // console.log('Product:', res.data.products);
            setProducts(res.data.products);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    useEffect(() => {
        getProducts()

    }, []);
    return {
        products: [products, setProducts]
    }
}

export default ProductAPI
