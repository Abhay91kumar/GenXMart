import React, { useContext, useState } from 'react';
import Search from './Search';
import Login from "../MainPages/Login/Login";
import { MdOutlineMenu } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import logo from '../Image/logo.png';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
const server = process.env.REACT_APP_SERVER;


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const state = useContext(GlobalState)

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart

  // console.log("Product Header:", state)
  const logOutUser = async () => {
    try {
      await axios.get(`${server}/user/logout`, { withCredentials: true });
      localStorage.removeItem('First Login');
      localStorage.removeItem('cart')
      setCart([]);
      window.location.href = '/';
      alert("LogOut Successeful ?")
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  const adminRouter = () => {
    return (
      <>
        <li><Link to='/create_product'>Create Product</Link> </li>
        <li><Link to='/category'>Categories</Link> </li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li><Link to='/address'>Address</Link></li>
        <li><Link to='/history'>History</Link> </li>
        <li><Link to='/product' onClick={logOutUser}>Logout</Link> </li>
      </>
    )
  }

  return (
    <header>
      <div className='css-1r5c520'>
        <div className='cds-1 main-nav-container css-ys0mpv cds-2 cds-7'>
          <div className="cds-9 css-1kspkkz cds-10">
            <div className='cds-9 css-le7uaf cds-10 cds-11 cds-grid-item cds-18'>
              <div className='cds-9 css-0 cds-11 cds-grid-item'><Link to='/'><img src={logo} alt='ShopZone' /></Link></div>
              <div className='cds-9 css-1qf9240 cds-10 cds-11 cds-grid-item cds-18'>
                <button
                  className='cds-149 cds-button-disableElevation cds-button-ghost css-xy0caz'
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  onClick={toggleMenu}
                >
                  <span className='cds-button-label'>Exprore</span>
                  <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <ul
                      // onMouseEnter={() => setIsMenuOpen(true)}
                      // onMouseLeave={() => setIsMenuOpen(false)}
                    >
                      <li><Link to='/product'>{isAdmin ? 'Product' : 'Shop'}</Link></li>
                      <li><Link to='/mobile'>Mobile & Tablet</Link></li>
                      <li><Link to='/fashion'>Fashion</Link></li>
                    </ul>
                  </nav>
                </button>
              </div>
            </div>
            <div className='cds-9 css-1tlquih cds-10 cds-11 cds-grid-item cds-16 cds-18'>
              <div className='css-15st4kj'>
                <div className='rc-SearchBarContentWrapper css-ueaybp'>
                  <form className='search-form css-14o2hni' role='search'>
                    <div className='rc-SearchBarContent'>
                      <Search />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='cds-9 css-1tlquih cds-10 cds-11 cds-grid-item cds-16 cds-18 cds-28'>
              <div className='cds-9 css-0 cds-11 cds-grid-item cds-16' >
                {isAdmin && adminRouter()}

                {
                  isLogged ? (
                    loggedRouter()
                  ) : (
                    <button
                      className="login-btn"
                      onClick={() => setShowLogin(true)}
                    >
                      <></>
                      Profile
                    </button>
                  )
                }

                {showLogin && (
                  <Login closeModal={() => setShowLogin(false)} />
                )}
              </div>
              <div className='cds-9 css-0 cds-11 cds-grid-item cds-16'>{
                isAdmin ? (
                  <Link to="/admin/dashboard" className="admin-link">
                    <MdAdminPanelSettings size={20} style={{ marginRight: '6px' }} />
                    Dashboard
                  </Link>
                ) : <div className='cart-icon'>
                  <span>{cart.length}</span>
                  <Link to='/cart'><MdOutlineAddShoppingCart size={26} /></Link>
                </div>
              }</div>
            </div>
          </div>
        </div>
      </div>
      <div className='menu' onClick={toggleMenu}>
        {isMenuOpen ? <IoMdClose size={28} /> : <MdOutlineMenu size={28} />}
      </div>

    </header>
  );
};

export default Header;
