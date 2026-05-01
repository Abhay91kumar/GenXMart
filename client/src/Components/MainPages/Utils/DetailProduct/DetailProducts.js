import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import LoginModal from "../../Login/Login";

const DetailProducts = ({ product }) => {

  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const handleBuyNow = state.userAPI.handleBuyNow;
  const [token] = state.token;

  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  if (!product) return null;

  const isLoggedIn = () => token && token !== "";

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    addCart(product);
    navigate('/cart');
  };

  const handleBuy = () => {
    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    handleBuyNow(product);

    navigate(`/checkout/${product._id}`, {
      state: {
        item: {
          ...product,
          quantity: 1,
          totalPrice: product.price
        }
      }
    });
  };

  return (
    <div className='details'>
      <img src={product.image?.url} alt='' width="100" />

      <div className='box_detail'>
        <div className='row'>
          <h2>{product.title}</h2>
          <h6>{product.product_id}</h6>
        </div>

        <span>₹ {product.price}</span>
        <p>{product.description}</p>
        <p className='sold-count'>Sold: {product.sold}</p>

        {!isAdmin && (
          <div className='row_btn'>

            <button id='btn-add' onClick={handleAddToCart}>
              Add to cart
            </button>

            <button id='btn_buy' onClick={handleBuy}>
              Buy Now
            </button>

          </div>
        )}
      </div>

      {showLogin && (
        <LoginModal closeModal={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default DetailProducts;