import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import MobileCard from '../Utils/MobileCard';

const Mobile = () => {
  const state = useContext(GlobalState);
  const [mobiles] = state.mobileAPI.mobiles;


  return (
    <div className="mobile-container">
      {mobiles.map(mobile => (
        <MobileCard key={mobile._id} mobile={mobile} />
      ))}
    </div>
  );
};

export default Mobile;
