// src/components/CTA.js
import React from 'react';

const CTA = () => {
  return (
    <section className="container">
      <div className="cta">
        <h2 className="cta-title">Ready for Your Dream Getaway?</h2>
        <p className="cta-subtitle">Book your luxury pool villa today and create unforgettable memories in paradise</p>
        <div className="cta-buttons">
          <a href="#" className="btn btn-primary">Browse Villas</a>
          <a href="#" className="btn btn-secondary">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;