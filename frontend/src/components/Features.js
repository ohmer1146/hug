// src/components/Features.js
import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "fas fa-home",
      title: "Private & Exclusive",
      description: "Enjoy complete privacy with your own dedicated space, staff, and amenities."
    },
    {
      icon: "fas fa-concierge-bell",
      title: "Personalized Service",
      description: "Our dedicated staff ensures your every need is met with personalized service."
    },
    {
      icon: "fas fa-infinity",
      title: "Premium Amenities",
      description: "From infinity pools to private chefs, experience luxury at its finest."
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Why Choose Our Villas</h2>
        <p className="section-subtitle">Experience the perfect blend of luxury, privacy, and authentic Thai hospitality</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;