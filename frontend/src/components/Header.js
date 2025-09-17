// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // เพิ่ม import นี้

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🏖️</div>
            <Link to="/" className="logo-text">Home Hug Pool Villas</Link> {/* เปลี่ยนเป็น Link */}
          </div>
          <nav>
            <ul>
              <li><Link to="/">หน้าแรก</Link></li> {/* เปลี่ยนเป็น Link */}
              <li><Link to="/villas">วิลล่า</Link></li> {/* เปลี่ยนเป็น Link */}
              <li><a href="#services">บริการ</a></li> {/* นี้เป็น anchor link จึงยังใช้ a อยู่ */}
              <li><Link to="/about">เกี่ยวกับเรา</Link></li> {/* เปลี่ยนเป็น Link */}
              <li><Link to="/contact">ติดต่อ</Link></li> {/* เปลี่ยนเป็น Link */}
            </ul>
          </nav>
          <Link to="/booking" className="book-now">จองตอนนี้</Link> {/* เปลี่ยนเป็น Link */}
        </div>
      </div>
    </header>
  );
};

export default Header;