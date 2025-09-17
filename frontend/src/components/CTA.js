// src/components/CTA.js
import React from 'react';
import { Link } from 'react-router-dom'; // เพิ่ม import นี้

const CTA = () => {
  return (
    <section className="container">
      <div className="cta">
        <h2 className="cta-title">Ready for Your Dream Getaway?</h2>
        <p className="cta-subtitle">Book your luxury pool villa today and create unforgettable memories in paradise</p>
        <div className="cta-buttons">
          <Link to="/villas" className="btn btn-primary">Browse Villas</Link> {/* เปลี่ยนเป็น Link */}
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link> {/* เปลี่ยนเป็น Link */}
        </div>
      </div>
    </section>
  );
};

export default CTA;