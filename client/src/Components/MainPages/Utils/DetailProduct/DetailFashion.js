import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';



const DetailFashion = ({ fashion }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const handleBuyNow=state.userAPI.handleBuyNow;

  if (!fashion) return null;

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
        {isAdmin ? <></> :
          <>
            <div className='row_btn'>
              <Link id='btn-add' to='/cart' onClick={() => addCart(fashion)}>Add to cart</Link>
              <Link id='btn_buy'
                to={`/checkout/${fashion._id}`} state={{
                  item: {
                    ...fashion,
                    quantity: 1,
                    totalPrice: fashion.price
                  }
                }} onClick={()=>handleBuyNow(fashion)} > Buy Now</Link>
            </div>
          </>}
      </div>
    </div>
  );
};

export default DetailFashion;
