import React from 'react';
import { Link } from 'react-router-dom';
import './VillaCard.css';

const VillaCard = ({ villa }) => {
  if (!villa) {
    return (
      <div className="villa-card">
        <div className="villa-image">
          <div className="no-image-placeholder">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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

  return (
    <div className="villa-card">
      <div className="villa-image">
        {villa.images && villa.images[0] ? (
          <img src={villa.images[0]} alt={villa.name} />
        ) : (
          <div className="no-image-placeholder">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="villa-price">
          ฿{villa.pricePerNight ? villa.pricePerNight.toLocaleString('th-TH') : '0'}
        </div>
      </div>
      <div className="villa-content">
        <h3 className="villa-name">{villa.name || 'ไม่มีชื่อวิลล่า'}</h3>
        <p className="villa-location">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {villa.location || 'ไม่ทราบที่ตั้ง'}
        </p>
        <div className="villa-features">
          <span className="villa-feature">{villa.bedrooms || 0} ห้องนอน</span>
          <span className="villa-feature">{villa.bathrooms || 0} ห้องน้ำ</span>
          <span className="villa-feature">{villa.capacity || 0} ผู้เข้าพัก</span>
        </div>
        <Link to={`/villas/${villa._id}`} className="villa-button">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};

export default VillaCard;