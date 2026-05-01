import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import LoginModal from "../../Login/Login"

const DetailFashion = ({ fashion }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const handleBuyNow = state.userAPI.handleBuyNow;
  const [token] = state.token;

  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  if (!fashion) return null;

  const isLoggedIn = () => token && token !== "";

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }
    addCart(fashion);
    navigate('/cart');
  };

  const handleBuy = () => {
    if (!isLoggedIn()) {
      setShowLogin(true);
      return;
    }

    handleBuyNow(fashion);

    navigate(`/checkout/${fashion._id}`, {
      state: {
        item: {
          ...fashion,
          quantity: 1,
          totalPrice: fashion.price
        }
      }
    });
  };

  return (
    <div className='details'>
      <img src={fashion.image?.url} alt='' width="100" />

      <div className='box_detail'>
        <div className='row'>
          <h2>{fashion.title}</h2>
          <h6>{fashion.fashion_id}</h6>
        </div>

        <span>₹ {fashion.price}</span>
        <p>{fashion.description}</p>
        <p className='sold-count'>Sold: {fashion.sold}</p>

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

export default DetailFashion;