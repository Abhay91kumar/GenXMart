import { useEffect, useState } from 'react';
import axios from 'axios';
const server=process.env.REACT_APP_SERVER;

const ProductAPI = () => {

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const res = await axios.get(`${server}/api/product`,{withCredentials:true});
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
