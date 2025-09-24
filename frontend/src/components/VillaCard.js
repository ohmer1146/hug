// VillaCard.js - เพิ่มการตรวจสอบ
import React from 'react';
import { Link } from 'react-router-dom';
import './VillaCard.css';

const VillaCard = ({ villa }) => {
  // ตรวจสอบว่า villa และ villa._id มีค่าถูกต้อง
  if (!villa || !villa._id) {
    return (
      <div className="villa-card error">
        <div className="error-message">
          <p>ข้อมูลวิลล่าไม่สมบูรณ์</p>
          <Link to="/villas" className="btn">ดูวิลล่าอื่นๆ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="villa-card">
      <div className="villa-image">
        {mainImage ? (
          <img src={mainImage} alt={villa.name} />
        ) : (
          <div className="no-image">ไม่มีภาพ</div>
        )}
        <div className="villa-badge">พัทยา</div>
        <div className="villa-price-tag">
          ฿{villa.pricePerNight?.toLocaleString()}/คืน
        </div>
      </div>
      
      <div className="villa-content">
        <h3 className="villa-name">{villa.name}</h3>
        <p className="villa-location">📍 {villa.location}</p>
        
        <div className="villa-specs">
          <span>🛏️ {villa.bedrooms || 0} ห้องนอน</span>
          <span>🚿 {villa.bathrooms || 0} ห้องน้ำ</span>
          <span>👥 {villa.capacity || 0} คน</span>
        </div>
        
        <div className="villa-features">
          {villa.amenities?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="feature-tag">{amenity}</span>
          ))}
        </div>
        
        <div className="villa-actions">
          <Link to={`/villa/${villa._id}`} className="btn-detail">
            ดูรายละเอียด
          </Link>
          <Link to={`/booking?villaId=${villa._id}`} className="btn-book">
            จองตอนนี้
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;