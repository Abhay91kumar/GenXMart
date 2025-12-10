import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import HomeLists from '../Utils/HomeLists';
import '../Css/home.css'

const Home = () => {
  const state = useContext(GlobalState);

  const products = state?.productAPI?.products?.[0] || [];
  const mobiles = state?.mobileAPI?.mobiles?.[0] || [];
  const fashions = state?.fashionAPI?.fashions?.[0] || [];

  return (
    <div className='home-grid-container'>
      {[...fashions, ...mobiles, ...products].map(item => (
        <HomeLists key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Home;
