// VillaDetail.js - แก้ไขส่วนการ fetch data
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './VillaDetail.css';

const VillaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState(null);

  // ฟังก์ชันตรวจสอบ ID
  const isValidId = (id) => {
    return id && id !== 'undefined' && id !== 'null' && id.length === 24;
  };

  useEffect(() => {
    // ตรวจสอบว่า id มีค่าที่ถูกต้อง
    if (!isValidId(id)) {
      setError('รหัสวิลล่าไม่ถูกต้อง');
      setLoading(false);
      return;
    }

    const fetchVilla = async () => {
      try {
        console.log('กำลังโหลดข้อมูลวิลล่ารหัส:', id);
        
        const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'ไม่สามารถโหลดข้อมูลวิลล่าได้');
        }

        if (!data.success) {
          throw new Error(data.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
        }

        setVilla(data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching villa:', error);
        setError(error.message);
        
        // ใช้ข้อมูลตัวอย่างหาก API ล้มเหลว
        setVilla({
          _id: id,
          name: "Home Hug Pool Villa",
          description: "พูลวิลล่าสุดหรูในพัทยา พร้อมสระว่ายน้ำส่วนตัวและสิ่งอำนวยความสะดวกครบครัน",
          location: "พัทยา, ประเทศไทย",
          pricePerNight: 12500,
          images: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1"
          ],
          bedrooms: 3,
          bathrooms: 2,
          capacity: 6,
          amenities: ["สระว่ายน้ำส่วนตัว", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ", "ทีวี"],
          rating: 4.5,
          reviewCount: 15
        });
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

  if (error && !villa) {
    return (
      <div className="villa-detail-page">
        <div className="error-container">
          <h2>เกิดข้อผิดพลาด</h2>
          <p>{error}</p>
          <div className="error-actions">
            <Link to="/villas" className="btn btn-primary">กลับไปหน้าวิลล่า</Link>
            <button onClick={() => window.location.reload()} className="btn btn-secondary">
              ลองใหม่
            </button>
          </div>
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
              src={villa.images?.[activeImage] || "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523453567.jpg?k=b97f0dc98d43db8bc076acc5a06a7b6f37ce2b07996188564de4d96a16279bd5&o=&hp=1"} 
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