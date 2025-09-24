// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // เพิ่มบรรทัดนี้

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Home Hug Pool Villas</h3>
            <p>Luxury pool villas for unforgettable experiences in Thailand's most beautiful destinations.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/p/Home-Hug-Pool-Villa-Pattaya-100063712502026/?locale=th_TH" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>            
              <a href="https://www.tiktok.com/@homehugpoolvilla_pattaya?_t=8hDrVso70Aj&_r=1" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://line.me/R/ti/p/@098fitty" aria-label="Line">
                <i className="fab fa-line"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/"><i className="fas fa-chevron-right"></i> Home</Link></li>
              <li><Link to="/villas"><i className="fas fa-chevron-right"></i> Villas</Link></li>
              <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Destinations</h3>
            <ul className="footer-links">
              <li><span><i className="fas fa-chevron-right"></i> พัทยา</span></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <a href="https://maps.app.goo.gl/1ogGsNeD1SGMY9WRA" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-map-marker-alt"></i> VWH4+PPJ เมืองพัทยา อำเภอบางละมุง ชลบุรี 20150
              </a>
              <a href="tel:+66611058068">
                <i className="fas fa-phone"></i> +66 61 105 8068
              </a>
              <a href="mailto:aomsinliveindisneysland@gmail.com">
                <i className="fas fa-envelope"></i> aomsinliveindisneysland@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 Home Hug Pool Villas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;