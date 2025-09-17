// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // ฟังก์ชันสำหรับการ scroll ไปยังส่วนต่างๆ
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Luxury Pool Villas in <span>Pattaya</span></h1>
          <p className="hero-subtitle">Private pool villas along the Jhomteng with breathtaking views</p>
          <div className="hero-buttons">
            <Link to="/villas" className="btn btn-primary">View Our Villas</Link>
            <button onClick={() => scrollToSection('services')} className="btn btn-secondary">
              Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;