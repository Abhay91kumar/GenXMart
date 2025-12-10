import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import '../MainPages/Css/FinalCss/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Abhay Kumar. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/abhayvermakr" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/abhay07_kumar" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://x.com/Abhay53680066" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/abhay-kumar-verma-168ab22a4" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
