import React, { useContext, useState } from 'react';
import Search from './Search';
import { MdOutlineMenu } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../Image/logo.png';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const state = useContext(GlobalState)

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart

  // console.log("Product Header:", state)
  const logOutUser = async () => {
    try {
      await axios.get('/user/logout');
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
        <li><Link to='/history'>History</Link> </li>
        <li><Link to='/product' onClick={logOutUser}>Logout</Link> </li>
      </>
    )
  }

  return (
    <header>
      <div className='menu' onClick={toggleMenu}>
        {isMenuOpen ? <IoMdClose size={28} /> : <MdOutlineMenu size={28} />}
      </div>

      <div className='logo'>
        <Link to='/'><img src={logo} alt='ShopZone' /></Link>
      </div>

      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/product'>{isAdmin ? 'Product' : 'Shop'}</Link></li>
          <li><Link to='/mobile'>Mobile & Tablet</Link></li>
          <li><Link to='/fashion'>Fashion</Link></li>
          {isAdmin && adminRouter()}
          {
            isLogged ? loggedRouter() : <li><Link to='/login'>Login / Register</Link></li>
          }
        </ul>
      </nav>

      <div className='search-cart'>
        <div className='search-box'>
          <Search />
        </div>
        {
          isAdmin ? (
            <Link to="/admin/dashboard" className="admin-link">
              <MdAdminPanelSettings size={20} style={{ marginRight: '6px' }} />
              Dashboard
            </Link>
          ) : <div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'><MdOutlineAddShoppingCart size={26} /></Link>
          </div>
        }

      </div>
    </header>
  );
};

export default Header;
