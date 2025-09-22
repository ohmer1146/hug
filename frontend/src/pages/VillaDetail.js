import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import Map from '../components/Map';
import ImageUpload from '../components/ImageUpload';
import './VillaDetail.css';

const VillaDetail = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const { user } = useAuth();

  // ตรวจสอบว่าผู้ใช้เป็นแอดมินหรือไม่
  const isAdmin = user && user.role === 'admin';

  // ฟังก์ชันตรวจสอบและแปลงรูปภาพ
  const getImageUrl = (image) => {
    if (!image) return null;
    
    // ถ้าเป็น Base64 string
    if (typeof image === 'string' && image.startsWith('data:image')) {
      return image;
    }
    
    // ถ้าเป็น URL
    if (typeof image === 'string') {
      return image;
    }
    
    // ถ้าเป็น object ที่มีข้อมูลรูปภาพ
    if (typeof image === 'object' && image.url) {
      return image.url;
    }
    
    return null;
  };

  // ฟังก์ชันอัพเดทรูปภาพ (สำหรับแอดมินเท่านั้น)
  const handleImagesUpdate = async (newImages) => {
    if (!isAdmin) return;
    
    try {
      const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...villa,
          images: newImages
        }),
      });
      
      if (response.ok) {
        const updatedVilla = await response.json();
        setVilla(updatedVilla);
      }
    } catch (error) {
      console.error('Error updating villa images:', error);
    }
  };

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVilla(data);
        } else {
          setError('ไม่พบวิลล่า');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลวิลล่า');
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

  if (loading) return (
    <div className="villa-detail-page">
      <div className="villa-detail-container">
        <div className="loading-container">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    </div>
  );

  if (error || !villa) return (
    <div className="villa-detail-page">
      <div className="villa-detail-container text-center py-12">
        <svg className="w-24 h-24 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'ไม่พบข้อมูลวิลล่า'}</h1>
        <Link 
          to="/villas" 
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          กลับไปหน้ารายการวิลล่า
        </Link>
      </div>
    </div>
  );

  const mainImageUrl = villa.images && villa.images.length > 0 ? 
    getImageUrl(villa.images[activeImage]) : null;

  return (
    <div className="villa-detail-page">
      {/* Breadcrumb */}
      <div className="villa-breadcrumb">
        <nav className="breadcrumb-nav">
          <Link to="/">หน้าแรก</Link>
          <span className="mx-2">/</span>
          <Link to="/villas">วิลล่าทั้งหมด</Link>
          <span className="mx-2">/</span>
          <span>{villa.name}</span>
          {isAdmin && (
            <>
              <span className="mx-2">•</span>
              <span className="text-purple-600">โหมดผู้ดูแลระบบ</span>
            </>
          )}
        </nav>
      </div>

      <div className="villa-detail-container">
        {/* Villa Header */}
        <div className="villa-header">
          <div className="villa-header-top">
            <h1 className="villa-title">{villa.name}</h1>
            {isAdmin && (
              <div className="admin-badge">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                โหมดแก้ไข
              </div>
            )}
          </div>
          
          <div className="villa-location">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {villa.location}
          </div>
          
          <div className="villa-features">
            <div className="villa-feature">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {villa.capacity} ผู้เข้าพัก
            </div>
            <div className="villa-feature">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {villa.bedrooms} ห้องนอน
            </div>
            <div className="villa-feature">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {villa.bathrooms} ห้องน้ำ
            </div>
          </div>

          <div className="villa-price">
            ฿{villa.pricePerNight ? villa.pricePerNight.toLocaleString('th-TH') : '0'} <span>/ คืน</span>
          </div>
        </div>

        <div className="villa-content">
          {/* Left Column - Images and Details */}
          <div>
            {/* ส่วนอัพโหลดรูปภาพ (สำหรับแอดมินเท่านั้น) */}
            {isAdmin && (
              <div className="villa-section">
                <h2 className="villa-section-title">จัดการรูปภาพวิลล่า</h2>
                <div className="admin-only-message">
                  <p className="admin-only-text">
                    <strong>เฉพาะผู้ดูแลระบบ:</strong> คุณสามารถอัพโหลดและจัดการรูปภาพของวิลล่าได้ที่นี่
                  </p>
                </div>
                <ImageUpload 
                  onImagesChange={handleImagesUpdate}
                  existingImages={villa.images || []}
                />
              </div>
            )}

            {/* Main Image */}
            <div className="villa-main-image">
              {mainImageUrl ? (
                <img 
                  src={mainImageUrl} 
                  alt={villa.name} 
                />
              ) : (
                <div className="no-image-placeholder">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>ไม่มีภาพ</p>
                  {isAdmin && (
                    <p className="text-sm text-gray-500 mt-2">
                      อัพโหลดรูปภาพโดยใช้ส่วนจัดการรูปภาพด้านบน
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {villa.images && villa.images.length > 1 && (
              <div className="villa-thumbnails">
                {villa.images.map((image, index) => {
                  const imageUrl = getImageUrl(image);
                  return imageUrl ? (
                    <div 
                      key={index} 
                      className={`villa-thumbnail ${activeImage === index ? 'active' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`${villa.name} ${index + 1}`} 
                      />
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Description */}
            <div className="villa-section">
              <h2 className="villa-section-title">รายละเอียด</h2>
              <p className="villa-description">{villa.description || 'ไม่มีคำอธิบาย'}</p>
            </div>

            {/* Amenities */}
            <div className="villa-section">
              <h2 className="villa-section-title">สิ่งอำนวยความสะดวก</h2>
              <div className="amenities-grid">
                {villa.amenities && villa.amenities.length > 0 ? (
                  villa.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <svg className="amenity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-amenities">ไม่มีสิ่งอำนวยความสะดวก</p>
                )}
              </div>
            </div>

            {/* Map */}
            {villa.coordinates && (
              <div className="villa-section">
                <h2 className="villa-section-title">ที่ตั้ง</h2>
                <Map lat={villa.coordinates.lat} lng={villa.coordinates.lng} name={villa.name} />
              </div>
            )}

            {/* Reviews */}
            <div className="villa-section">
              <Reviews villaId={villa._id} />
            </div>
          </div>

          {/* Right Column - Booking Form */}
         <div className="booking-form-container">
  <div className="booking-form">
    <BookingForm 
      villa={villa} 
      onBookingSuccess={(booking) => {
        // นำทางไปยังหน้ายืนยันการจอง
        window.location.href = `/booking-confirmation/${booking._id}`;
      }}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetail;