// src/pages/VillaDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VillaDetail.css';

const VillaDetail = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // ตรวจสอบว่า id มีค่าและไม่ใช่ "undefined"
    if (!id || id === 'undefined') {
      setLoading(false);
      return;
    }

    const fetchVilla = async () => {
      try {
        console.log('กำลังโหลดวิลล่ารหัส:', id);
        const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setVilla(data);
        } else {
          // ใช้ข้อมูลตัวอย่างหาก API ล้มเหลว
          useSampleVilla();
        }
      } catch (error) {
        console.error('Error fetching villa:', error);
        useSampleVilla();
      } finally {
        setLoading(false);
      }
    };

    const useSampleVilla = () => {
      setVilla({
        _id: id,
        name: "Home Hug Pool Villa",
        description: "พูลวิลล่าสุดหรูในพัทยา พร้อมสระว่ายน้ำส่วนตัวและสิ่งอำนวยความสะดวกครบครัน ตั้งอยู่ในทำเลที่ดีใกล้ทะเลและแหล่งช้อปปิ้ง",
        location: "พัทยา, ประเทศไทย",
        pricePerNight: 12500,
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1"
        ],
        bedrooms: 3,
        bathrooms: 2,
        capacity: 6,
        amenities: ["สระว่ายน้ำส่วนตัว", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ", "ทีวี", "ครัวพร้อม"],
        rating: 4.5,
        reviewCount: 15
      });
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
          <p>ขออภัย ไม่พบวิลล่าที่คุณกำลังมองหา</p>
          <Link to="/villas" className="btn btn-primary">กลับไปหน้าวิลล่า</Link>
        </div>
      </div>
    );
  }

  // ตรวจสอบ images
  const images = villa.images && Array.isArray(villa.images) ? villa.images : [];
  const defaultImage = "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1";

  return (
    <div className="villa-detail-page">
      <div className="villa-detail-container">
        <nav className="breadcrumb">
          <Link to="/">หน้าแรก</Link> &gt; 
          <Link to="/villas">วิลล่า</Link> &gt; 
          <span>{villa.name}</span>
        </nav>

        {/* Villa Images */}
        <div className="villa-images">
          <div className="main-image">
            <img 
              src={images[activeImage] || defaultImage} 
              alt={villa.name}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
          </div>
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${villa.name} ${index + 1}`}
                  className={index === activeImage ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
              ))}
            </div>
          )}
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
            <h2>฿{(villa.pricePerNight || 0).toLocaleString('th-TH')} <span>/ คืน</span></h2>
          </div>

          <div className="villa-features">
            <div className="feature">
              <span>🛏️ {villa.bedrooms || 0} ห้องนอน</span>
            </div>
            <div className="feature">
              <span>🚿 {villa.bathrooms || 0} ห้องน้ำ</span>
            </div>
            <div className="feature">
              <span>👥 {villa.capacity || 0} ผู้เข้าพัก</span>
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