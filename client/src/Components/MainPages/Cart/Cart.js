import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const removeFromCart = state.userAPI.removeFromCart;
  const increaseQty = state.userAPI.increaseQty;
  const decreaseQty = state.userAPI.decreaseQty;

  if (cart.length === 0)
    return <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty 😕</h2>;

  return (
    <div className='cart-container'>
      {cart.map((item) => (
        <div className='details' key={item._id || item.product_id || item.fashion_id}>
          <img src={item.image?.url} alt='' width='100' />
          <div className='box_detail'>
            <div className='row'>
              <h2>{item.title}</h2>
              <h6>{item.product_id || item.fashion_id || item.mobile_id}</h6>
            </div>
            <div className='btn-quantity'>
              <button onClick={() => decreaseQty(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item)}>+</button>
            </div>
            <p id='total'>Total: ₹ {item.totalPrice}</p>
            <div className='row_btn'>
              <button id="btn-remove" onClick={() => removeFromCart(item)}>Remove</button>
              <Link
                id="btn_buy"
                to={`/checkout/${item._id}`}
                state={{ item }}
              >
                Buy Now
              </Link>

            </div>
          </div>
        </div>
      ))}

      <div className='cart-total'>
        <h3>
          Cart Total: ₹ {cart.reduce((sum, item) => sum + item.totalPrice, 0)}
        </h3>
        <Link id='btn_buy' to="/checkout">Buy Now</Link>
      </div>

    </div>
  );
};

export default Cart;
