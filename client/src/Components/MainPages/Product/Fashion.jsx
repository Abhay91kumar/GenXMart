import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import FashionCard from '../Utils/FashionCard';

const Fashion = () => {
  const state = useContext(GlobalState);
  const [fashions] = state.fashionAPI.fashions;


  return (
    <div className="fashion-container">
      {fashions.map(fashion => (
        <FashionCard key={fashion._id} fashion={fashion}  />
      ))}
    </div>
  );
};

export default Fashion;
