// src/components/VillaCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './VillaCard.css';

const VillaCard = ({ villa }) => {
  // ตรวจสอบว่า villa มีค่าถูกต้อง
  if (!villa) {
    return (
      <div className="villa-card error">
        <div className="villa-image">
          <div className="no-image-placeholder">
            <i className="fas fa-home"></i>
          </div>
        </div>
        <div className="villa-content">
          <h3 className="villa-name">ไม่พบข้อมูลวิลล่า</h3>
          <Link to="/villas" className="villa-button">
            ดูวิลล่าอื่นๆ
          </Link>
        </div>
      </div>
    );
  }

  // ฟังก์ชันดึง URL รูปภาพ
  const getImageUrl = (image) => {
    if (!image) return null;
    
    if (typeof image === 'string') {
      return image;
    }
    
    if (typeof image === 'object' && image.url) {
      return image.url;
    }
    
    return null;
  };

  const mainImage = villa.images && villa.images.length > 0 
    ? getImageUrl(villa.images[0]) 
    : null;

  const price = villa.pricePerNight || 0;
  const bedrooms = villa.bedrooms || 0;
  const bathrooms = villa.bathrooms || 0;
  const capacity = villa.capacity || villa.guests || 0;

  return (
    <div className="villa-card">
      <div className="villa-image">
        {mainImage ? (
          <img src={mainImage} alt={villa.name} onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }} />
        ) : null}
        <div className={`no-image-placeholder ${mainImage ? 'hidden' : ''}`}>
          <i className="fas fa-home"></i>
        </div>
        <div className="villa-price">
          ฿{price.toLocaleString('th-TH')}<span>/คืน</span>
        </div>
      </div>
      
      <div className="villa-content">
        <h3 className="villa-name">{villa.name || 'ไม่มีชื่อวิลล่า'}</h3>
        <p className="villa-location">
          <i className="fas fa-map-marker-alt"></i>
          {villa.location || 'ไม่ทราบที่ตั้ง'}
        </p>
        
        <div className="villa-features">
          <span className="villa-feature">
            <i className="fas fa-bed"></i> {bedrooms} ห้องนอน
          </span>
          <span className="villa-feature">
            <i className="fas fa-bath"></i> {bathrooms} ห้องน้ำ
          </span>
          <span className="villa-feature">
            <i className="fas fa-users"></i> {capacity} ผู้เข้าพัก
          </span>
        </div>
        
        <Link to={`/villa/${villa._id}`} className="villa-button">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default VillaCard;