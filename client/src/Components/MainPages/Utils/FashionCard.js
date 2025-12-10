import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const FashionCard = ({ fashion }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="fashion-card">
      {isAdmin ?
        <><Link id='' to='' > <img src={fashion.image?.url} alt='' width="100" /></Link></>
        : <><Link id='' to={`/detail/${fashion._id}`} > <img src={fashion.image?.url} alt='' width="100" /></Link></>}
      <div className="fashion-box">
        <h2 title={fashion.title}>{fashion.title}</h2>
        <span>₹ {fashion.price}</span>
        <p>{fashion.description}</p>
      </div>

      <div className='row_btn'>
        {
          isAdmin ? <>
            <Link id='btn_buy' to={`/delete/${fashion._id}`} >Delete</Link>
            <Link id='btn_view' to={`/edit/${fashion._id}`} >Edit</Link>
          </> : <></>
        }
      </div>
    </div>
  );
};

export default FashionCard;
