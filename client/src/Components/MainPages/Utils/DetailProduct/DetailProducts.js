import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

const DetailProducts = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const handleBuyNow=state.userAPI.handleBuyNow;

  if (!product) return null;

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
        {isAdmin ? <></> :
          <>
            <div className='row_btn'>
              <Link id='btn-add' to='/cart' onClick={() => addCart(product)}>Add to cart</Link>
              <Link id='btn_buy'
                to={`/checkout/${product._id}`} state={{
                  item: {
                    ...product,
                    quantity: 1,
                    totalPrice: product.price
                  }
                }} onClick={()=>handleBuyNow(product)} > Buy Now</Link>
            </div>
          </>}
      </div>
    </div>
  );
};

export default DetailProducts;
