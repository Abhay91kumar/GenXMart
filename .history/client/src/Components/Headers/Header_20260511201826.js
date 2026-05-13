import React, { useContext, useState } from 'react';
import Search from './Search';
import Login from "../MainPages/Login/Login";
import { MdOutlineMenu } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../Image/logo.png';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const server = process.env.REACT_APP_SERVER;

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;

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
                    {isMenuOpen ? "Close" : "Explore"}
                  </span>

                  <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>

                    <ul>

                      <li>
                        <Link
                          to='/product'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Shop
                        </Link>
                      </li>

                      <li>
                        <Link
                          to='/mobile'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Mobile & Tablet
                        </Link>
                      </li>

                      <li>
                        <Link
                          to='/fashion'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Fashion
                        </Link>
                      </li>

                      {isLogged ? (
                        <>
                          <li>
                            <Link
                              to='/address'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Address
                            </Link>
                          </li>

                          <li>
                            <Link
                              to='/history'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              History
                            </Link>
                          </li>

                          <li>
                            <Link
                              to='/cart'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <MdOutlineAddShoppingCart size={20} />
                              Cart ({cart.length})
                            </Link>
                          </li>

                          {isAdmin && (
                            <>
                              <li>
                                <Link
                                  to='/create_product'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Create Product
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to='/category'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  Categories
                                </Link>
                              </li>

                              <li>
                                <Link
                                  to='/admin/dashboard'
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <MdAdminPanelSettings size={18} />
                                  Dashboard
                                </Link>
                              </li>
                            </>
                          )}

                          <li>
                            <Link to='/' onClick={logOutUser}>
                              Logout
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <button
                            className="login-btn"
                            onClick={() => {
                              setShowLogin(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            Login / Register
                          </button>
                        </li>
                      )}

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

          </div>

        </div>
      </div>

      <div className='menu' onClick={toggleMenu}>
        {
          isMenuOpen
            ? <IoMdClose size={28} />
            : <MdOutlineMenu size={28} />
        }
      </div>

      {
        showLogin && (
          <Login closeModal={() => setShowLogin(false)} />
        )
      }

    </header>
  );
};

export default Header;