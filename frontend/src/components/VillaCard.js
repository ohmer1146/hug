// src/components/VillaCard.js
import React from 'react';
import { Link } from 'react-router-dom';

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
            {villa.guests} ผู้เข้าพัก
          </div>
          <div className="villa-feature">
            <i className="fas fa-bed"></i>
            {villa.bedrooms} ห้องนอน
          </div>
          <div className="villa-feature">
            <i className="fas fa-bath"></i>
            {villa.bathrooms} ห้องน้ำ
          </div>
        </div>
        <p className="villa-description">{villa.description}</p>
        <div className="villa-price">฿{villa.price.toLocaleString('th-TH')} / คืน</div>
        <Link to={`/villa/${villa.id}`} className="villa-button">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default VillaCard;