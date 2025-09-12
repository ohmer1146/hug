// src/components/VillaCard.js
import React from 'react';

const VillaCard = ({ villa }) => {
  return (
    <div className="villa-card">
      <div className="villa-image">
        <img src={villa.image} alt={villa.name} />
      </div>
      <div className="villa-content">
        <h3 className="villa-name">{villa.name}</h3>
        <div className="villa-location">
          <i className="fas fa-map-marker-alt"></i>
          {villa.location}
        </div>
        <div className="villa-features">
          <div className="villa-feature">
            <i className="fas fa-users"></i>
            {villa.guests} Guests
          </div>
          <div className="villa-feature">
            <i className="fas fa-bed"></i>
            {villa.bedrooms} Bedrooms
          </div>
          <div className="villa-feature">
            <i className="fas fa-bath"></i>
            {villa.bathrooms} Bathrooms
          </div>
        </div>
        <p className="villa-description">{villa.description}</p>
        <div className="villa-price">฿{villa.price.toLocaleString()} / night</div>
        <a href="#" className="villa-button">View Details</a>
      </div>
    </div>
  );
};

export default VillaCard;