import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const MobileCard = ({ mobile }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="mobile-card">
      {isAdmin ?
        <><Link id='' to='' > <img src={mobile.image?.url} alt='' width="100" /></Link></>
        : <><Link id='' to={`/detail/${mobile._id}`} > <img src={mobile.image?.url} alt='' width="100" /></Link></>}

      <div className="mobile-box">
        <h2 title={mobile.title}>{mobile.title}</h2>
        <span>₹ {mobile.price}</span>
        <p>{mobile.description}</p>
      </div>

      <div className='row_btn'>
        {
          isAdmin ? <>
            <Link id='btn_buy' to={`/delete/${mobile._id}`} >Delete</Link>
            <Link id='btn_view' to={`/edit/${mobile._id}`} >Edit</Link>
          </> : <></>
        }
      </div>
    </div>
  );
};

export default MobileCard;
