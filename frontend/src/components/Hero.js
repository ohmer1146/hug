// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Luxury Pool Villas in <span>Pattaya</span></h1>
          <p className="hero-subtitle">Private pool villas along the Jhomteng with breathtaking views</p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary">View Our Villas</a>
            <a href="#" className="btn btn-secondary">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;