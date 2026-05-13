import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import HomeLists from '../Utils/HomeLists';
import '../Css/home.css';
import '../Css/FinalCss/animation.css';

const Home = () => {
  const state = useContext(GlobalState);

  const products = state?.productAPI?.products?.[0] || [];
  const mobiles = state?.mobileAPI?.mobiles?.[0] || [];
  const fashions = state?.fashionAPI?.fashions?.[0] || [];

  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const hasData =
    products.length > 0 ||
    mobiles.length > 0 ||
    fashions.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasData) {
        setIsOffline(false);
      } else {
        setIsOffline(true);
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasData]);

  const DummyGrid = ({ count = 6 }) => (
    <div className="home-dummy-grid">
      {Array(count).fill().map((_, i) => (
        <div className="home-dummy-card" key={i}>
          <div className="dummy-img"></div>
          <div className="dummy-text"></div>
          <div className="dummy-btn"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='HomePageWrapper'>

      {/* ================= SLIDER ================= */}
      <section className="slider-wrapper">
        <div className="AdHeroSection">

          {(loading || isOffline)
            ? <div className='loding'
            : fashions.slice(0, 4).map((item, index) => (
                <div className="home-ad-section" key={index}>
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className="ad-Section"
                  />
                </div>
              ))
          }

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className='productsHeroSection'>

        {(loading || isOffline)
          ? <DummyGrid count={6} />
          : products.slice(0, 10).map(item => (
              <HomeLists key={item._id} item={item} />
            ))
        }

      </section>

      {/* ================= MOBILE / FASHION ================= */}
      <section className='mobilesHeroSection visible'>

        {(loading || isOffline)
          ? <DummyGrid count={6} />
          : fashions.slice(5, 15).map(item => (
              <HomeLists key={item._id} item={item} />
            ))
        }

      </section>

      {/* ================= FASHIONS ================= */}
      <section className='fashionsHeroSection visible'>

        {(loading || isOffline)
          ? <DummyGrid count={6} />
          : mobiles.slice(0, 10).map(item => (
              <HomeLists key={item._id} item={item} />
            ))
        }

      </section>

    </div>
  );
};

export default Home;