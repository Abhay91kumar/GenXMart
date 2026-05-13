import React, { useContext, useState, useEffect, useRef } from 'react';
import Search from './Search';
import Login from "../MainPages/Login/Login";
import { MdOutlineMenu, MdAdminPanelSettings, MdOutlineAddShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../Image/logo.png';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const server = process.env.REACT_APP_SERVER;

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const menuRef = useRef();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const logOutUser = async () => {

    try {

      await axios.get(`${server}/user/logout`, {
        withCredentials: true
      });

      localStorage.removeItem('First Login');
      localStorage.removeItem('cart');

      setCart([]);

      window.location.href = '/';

      alert("Logout Successful");

    } catch (err) {

      console.error("Logout failed:", err);

    }

  };

  return (
    <header>

      <div className='css-1r5c520'>

        <div className='cds-1 main-nav-container css-ys0mpv cds-2 cds-7'>

          <div className="cds-9 css-1kspkkz cds-10">

            <div className='cds-9 css-le7uaf cds-10 cds-11 cds-grid-item cds-18'>

              <div className='cds-9 css-0 cds-11 cds-grid-item'>

                <Link to='/'>
                  <img src={logo} alt='ShopZone' />
                </Link>

              </div>

              <div className='cds-9 css-1qf9240 cds-10 cds-11 cds-grid-item cds-18'>

                <button
                  className='cds-149 cds-button-disableElevation cds-button-ghost css-xy0caz'
                  onClick={toggleMenu}
                >

                  <span className='cds-button-label'>
                    Explore
                  </span>

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

              <div className='cds-9 css-0 cds-11 cds-grid-item cds-16'>

                {
                  isLogged ? (
                    <button
                      className="search-toggle-btn"
                      onClick={() => setShowSearch(!showSearch)}
                    >
                      <IoSearch size={24} />
                    </button>
                  ) : (
                    <button
                      className="login-btn"
                      onClick={() => setShowLogin(true)}
                    >

                      <div className='profiile'>
                        <CgProfile size={24} />
                      </div>

                      Profile

                    </button>
                  )
                }

                {
                  showLogin &&
                  <Login closeModal={() => setShowLogin(false)} />
                }

              </div>

              <div className='cds-9 css-0 cds-11 cds-grid-item cds-16'>

                {
                  !isAdmin && (
                    <div className='cart-icon'>

                      <span>{cart.length}</span>

                      <Link to='/cart'>
                        <MdOutlineAddShoppingCart size={26} />
                      </Link>

                    </div>
                  )
                }

              </div>

            </div>

          </div>

        </div>

      </div>

      {
        showSearch && (
          <div className='mobile-search-bar'>

            <form className='mobile-search-form'>

              <Search />

            </form>

          </div>
        )
      }

      <nav
        ref={menuRef}
        className={`nav-links ${isMenuOpen ? 'open' : ''}`}
      >

        <ul>

          <li onClick={() => setIsMenuOpen(false)}>

            <Link to='/product'>
              {isAdmin ? 'Product' : 'Shop'}
            </Link>

          </li>

          <li onClick={() => setIsMenuOpen(false)}>

            <Link to='/mobile'>
              Mobile & Tablet
            </Link>

          </li>

          <li onClick={() => setIsMenuOpen(false)}>

            <Link to='/fashion'>
              Fashion
            </Link>

          </li>

          {
            isAdmin && (
              <>

                <li onClick={() => setIsMenuOpen(false)}>

                  <Link to='/create_product'>
                    Create Product
                  </Link>

                </li>

                <li onClick={() => setIsMenuOpen(false)}>

                  <Link to='/admin/dashboard'>

                    <MdAdminPanelSettings
                      size={18}
                      style={{ marginRight:'6px' }}
                    />

                    Dashboard

                  </Link>

                </li>

              </>
            )
          }

          {
            isLogged && (
              <>

                <li onClick={() => setIsMenuOpen(false)}>

                  <Link to='/address'>
                    Address
                  </Link>

                </li>

                <li onClick={() => setIsMenuOpen(false)}>

                  <Link to='/history'>
                    History
                  </Link>

                </li>

                <li onClick={() => setIsMenuOpen(false)}>

                  <Link
                    to='/product'
                    onClick={logOutUser}
                  >
                    Logout
                  </Link>

                </li>

              </>
            )
          }

        </ul>

      </nav>

      <div
        className='menu'
        onClick={toggleMenu}
      >

        {
          isMenuOpen
            ? <IoMdClose size={28} />
            : <MdOutlineMenu size={28} />
        }

      </div>

    </header>
  );
};

export default Header;