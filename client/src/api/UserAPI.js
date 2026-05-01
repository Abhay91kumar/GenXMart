import axios from 'axios';
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
const server=process.env.REACT_APP_SERVER;

const UserAPI = (token) => {
    // console.log("Token ",token)
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get(`${server}/user/information`, {
                        headers: { Authorization: token }
                    })
                    setCart(res.data.cart);
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    const decoded = jwtDecode(token);
                    setUser({
                        id: decoded.id, name: res.data.name, email: res.data.email,
                    });

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser();
        }
    }, [token])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        const updateCartToBackend = async () => {
            if (token) {
                await axios.patch(`${server}/user/addcart`, { cart }, {
                    headers: { Authorization: token }
                });
            }
        };

        updateCartToBackend();
    }, [cart, token]);

    const addCart = async (product) => {
        if (!isLogged) return window.location.href="/"

        const check = cart.every(item => {
            return item._id !== product._id
        })
        if (check) {
            setCart([...cart, { ...product, quantity: 1, totalPrice: product.price }])
        } else {
            alert('This Product is Already to Cart')
        }
    }

    const handleBuyNow = (product) => {
        if (!isLogged) 
            return window.location.href="/";
        }

        const removeFromCart = async (product) => {
            setCart(cart.filter(item => item._id !== product._id));
        };

        const increaseQty = (product) => {
            const updatedCart = cart.map(item => {
                if (item._id === product._id) {
                    const qty = item.quantity + 1;
                    return {
                        ...item,
                        quantity: qty,
                        totalPrice: qty * item.price
                    };
                }
                return item;
            });
            setCart(updatedCart);
        };

        const decreaseQty = (product) => {
            const updatedCart = cart.map(item => {
                if (item._id === product._id && item.quantity > 1) {
                    const qty = item.quantity - 1;
                    return {
                        ...item,
                        quantity: qty,
                        totalPrice: qty * item.price
                    };
                }
                return item;
            });
            setCart(updatedCart);
        };


        return {
            isLogged: [isLogged, setIsLogged],
            isAdmin: [isAdmin, setIsAdmin],
            cart: [cart, setCart],
            addCart: addCart,
            handleBuyNow: handleBuyNow,
            user: [user, setUser],
            removeFromCart: removeFromCart,
            increaseQty: increaseQty,
            decreaseQty: decreaseQty

        }
    }
    
    export default UserAPI
