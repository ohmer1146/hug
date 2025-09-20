import React from 'react';
import { Link } from 'react-router-dom';
import './VillaCard.css';

const VillaCard = ({ villa }) => {
  return (
    <div className="villa-card">
      <div className="villa-image">
        <img src={villa.images[0]} alt={villa.name} />
        <div className="villa-price">
          ฿{villa.pricePerNight.toLocaleString('th-TH')}
        </div>
      </div>
      <div className="villa-content">
        <h3 className="villa-name">{villa.name}</h3>
        <p className="villa-location">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {villa.location}
        </p>
        <div className="villa-features">
          <span className="villa-feature">{villa.bedrooms} ห้องนอน</span>
          <span className="villa-feature">{villa.bathrooms} ห้องน้ำ</span>
          <span className="villa-feature">{villa.capacity} ผู้เข้าพัก</span>
        </div>
        <Link to={`/villas/${villa._id}`} className="villa-button">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default VillaCard;