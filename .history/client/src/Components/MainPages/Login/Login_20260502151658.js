import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
import Register from './Register';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const server = process.env.REACT_APP_SERVER;

const Login = ({ closeModal }) => {
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/user/login`, { ...user }, { withCredentials: true });

      localStorage.setItem("First Login", true);
      localStorage.setItem('token', res.data.accesstoken);

      toast.success("Login successful 🎉", {
        onClose: () => {
          closeModal();
          window.location.reload();
        },
      });

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="modal-overlay">
      
        <div className="login-modal">

          <button className="close-btn" onClick={closeModal}>×</button>

          <form onSubmit={loginSubmit} className='login-form'>
            <h2>Login</h2>

            <input
              type='email'
              name='email'
              required
              placeholder='Enter Email'
              value={user.email}
              onChange={onChangeInput}
            />

            <input
              type='password'
              name='password'
              required
              placeholder='Enter Password'
              value={user.password}
              onChange={onChangeInput}
            />

            <div className='row'>
              <button type='submit'>Login</button>
              <button onClick={() => setShowRegister(true)}>
                Register
              </button>

              {
                showRegister && (
                  <Register
                    closeModal={() => setShowRegister(false)}
                  />
                )
              }
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Login;