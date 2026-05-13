import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const server = process.env.REACT_APP_SERVER;

const Register = ({ closeModal }) => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        `${server}/user/register`,
        { ...user },
        { withCredentials: true }
      );

      localStorage.setItem('First Register', true);

      toast.success("Registration successful 🎉", {
        onClose: () => {
          closeModal();
          window.location.reload();
        }
      });

    }
    catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return ReactDOM.createPortal(
    <>
    
      <div className="modal-overlay">
        <div className="login-modal">

          <button
            className="close-btn"
            onClick={closeModal}
          >
            ×
          </button>

          <form
            onSubmit={registerSubmit}
            className="register-form"
          >

            <h2>Create Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={onChangeInput}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={onChangeInput}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={user.password}
              onChange={onChangeInput}
              required
            />

            <div className="row">
              <button type="submit">
                Register
              </button>

              <Link
                to="/"
                onClick={closeModal}
              >
                Login
              </Link>

            </div>

          </form>

        </div>
      </div>
    </>,
    document.body
  );

};

export default Register;