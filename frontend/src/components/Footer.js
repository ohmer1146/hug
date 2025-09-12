// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Home Hug Pool Villas</h3>
            <p>Luxury pool villas for unforgettable experiences in Thailand's most beautiful destinations.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-line"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-chevron-right"></i> Home</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Villas</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> About Us</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Destinations</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-chevron-right"></i> Phuket</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Koh Samui</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Krabi</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Hua Hin</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-map-marker-alt"></i> 123 Beach Road, Pattaya, Thailand</a></li>
              <li><a href="#"><i className="fas fa-phone"></i> +66 12 345 6789</a></li>
              <li><a href="#"><i className="fas fa-envelope"></i> info@luxurypoolvillas.com</a></li>
            </ul>
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