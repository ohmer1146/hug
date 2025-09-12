// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🏖️</div>
            <div className="logo-text">Home Hug Pool Villas</div>
          </div>
          <nav>
            <ul>
              <li><a href="#">หน้าแรก</a></li>
              <li><a href="#">วิลล่า</a></li>
              <li><a href="#">บริการ</a></li>
              <li><a href="#">เกี่ยวกับเรา</a></li>
              <li><a href="#">ติดต่อ</a></li>
            </ul>
          </nav>
          <a href="#" className="book-now">จองตอนนี้</a>
        </div>
      </div>
    </header>
  );
};

export default Header;