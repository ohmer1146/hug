import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VillaDetail.css';

const VillaDetail = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVilla(data);
        } else {
          // ใช้ข้อมูลตัวอย่างหาก API ล้มเหลว
          setVilla({
            _id: id,
            name: "วิลล่าตัวอย่าง",
            description: "วิลล่าสวยงามพร้อมสิ่งอำนวยความสะดวกครบครัน",
            location: "พัทยา",
            pricePerNight: 3000,
            images: [
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
              "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"
            ],
            bedrooms: 3,
            bathrooms: 2,
            capacity: 6,
            amenities: ["สระว่ายน้ำ", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ"],
            rating: 4.5,
            reviewCount: 15
          });
        }
      } catch (error) {
        console.error('Error fetching villa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

  if (loading) {
    return (
      <div className="villa-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>กำลังโหลดข้อมูลวิลล่า...</p>
        </div>
      </div>
    );
  }

  if (!villa) {
    return (
      <div className="villa-detail-page">
        <div className="not-found">
          <h2>ไม่พบวิลล่า</h2>
          <Link to="/villas" className="btn btn-primary">กลับไปหน้าวิลล่า</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="villa-detail-page">
      <div className="villa-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">หน้าแรก</Link> &gt; 
          <Link to="/villas">วิลล่า</Link> &gt; 
          <span>{villa.name}</span>
        </nav>

        {/* Villa Images */}
        <div className="villa-images">
          <div className="main-image">
            <img 
              src={villa.images?.[activeImage] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"} 
              alt={villa.name} 
            />
          </div>
          <div className="image-thumbnails">
            {villa.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${villa.name} ${index + 1}`}
                className={index === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Villa Info */}
        <div className="villa-info">
          <div className="villa-header">
            <h1>{villa.name}</h1>
            <div className="villa-rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span>({villa.reviewCount || 0} รีวิว)</span>
            </div>
            <p className="villa-location">📍 {villa.location}</p>
          </div>

          <div className="villa-price">
            <h2>฿{(villa.pricePerNight || villa.pricePerMight || 0).toLocaleString('th-TH')} <span>/ คืน</span></h2>
          </div>

          <div className="villa-features">
            <div className="feature">
              <span>🛏️ {villa.bedrooms} ห้องนอน</span>
            </div>
            <div className="feature">
              <span>🚿 {villa.bathrooms} ห้องน้ำ</span>
            </div>
            <div className="feature">
              <span>👥 {villa.capacity} ผู้เข้าพัก</span>
            </div>
          </div>

          <div className="villa-description">
            <h3>รายละเอียด</h3>
            <p>{villa.description}</p>
          </div>

          <div className="villa-amenities">
            <h3>สิ่งอำนวยความสะดวก</h3>
            <div className="amenities-grid">
              {villa.amenities?.map((amenity, index) => (
                <span key={index} className="amenity">{amenity}</span>
              ))}
            </div>
          </div>

          <div className="booking-actions">
            <Link to={`/booking?villaId=${villa._id}`} className="btn btn-primary btn-large">
              จองตอนนี้
            </Link>
            <button className="btn btn-secondary">เพิ่มในรายการโปรด</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetail;