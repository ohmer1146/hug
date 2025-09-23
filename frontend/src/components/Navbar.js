// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏠 HomeHug
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={isActiveLink('/')} onClick={() => setIsMenuOpen(false)}>
            หน้าแรก
          </Link>
          <Link to="/villas" className={isActiveLink('/villas')} onClick={() => setIsMenuOpen(false)}>
            วิลล่า
          </Link>
          <Link to="/about" className={isActiveLink('/about')} onClick={() => setIsMenuOpen(false)}>
            เกี่ยวกับเรา
          </Link>
          <Link to="/contact" className={isActiveLink('/contact')} onClick={() => setIsMenuOpen(false)}>
            ติดต่อ
          </Link>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;