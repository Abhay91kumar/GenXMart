import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';


const DetailMobile = ({ mobile }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const handleBuyNow=state.userAPI.handleBuyNow;


  if (!mobile) return null;

  return (
    <div className='details'>
      <img src={mobile.image?.url} alt={mobile.title} className='details-image' />

      <div className='box_detail'>
        <div className='row'>
          <h2>{mobile.title}</h2>
          <h6>{mobile.mobile_id}</h6>
        </div>

        <span className='price'>₹ {mobile.price}</span>
        <p className='description'>{mobile.description}</p>
        <p className='brand'>Brand: {mobile.brand}</p>
        <p className='category'>Category: {mobile.category}</p>

        {mobile.specs && (
          <div className='specs'>
            <h4>Specifications</h4>
            <ul>
              <li><strong>RAM:</strong> {mobile.specs.Ram}</li>
              <li><strong>Storage:</strong> {mobile.specs.Storage}</li>
              <li><strong>Battery:</strong> {mobile.specs.Battery}</li>
              <li><strong>Camera:</strong> {mobile.specs.Camera}</li>
              <li><strong>Processor:</strong> {mobile.specs.Processor}</li>
              <li><strong>Display:</strong> {mobile.specs.Display}</li>
            </ul>
          </div>
        )}

        <p className='sold-count'>Sold: {mobile.sold || 0}</p>

        {isAdmin ? <></> :
          <>
            <div className='row_btn'>
              <Link id='btn-add' to='/cart' onClick={() => addCart(mobile)}>Add to cart</Link>
              <Link id='btn_buy'
                to={`/checkout/${mobile._id}`} state={{
                  item: {
                    ...mobile,
                    quantity: 1,
                    totalPrice: mobile.price
                  }
                }} onClick={()=>handleBuyNow(mobile)} > Buy Now</Link>
            </div>
          </>}
      </div>
    </div>
  );
};

export default DetailMobile;
