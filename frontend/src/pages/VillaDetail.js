// VillaDetail.js - แก้ไขให้สมบูรณ์ 100%
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
  
  // สถานะใหม่สำหรับระบบจองแบบเว็บตัวอย่าง
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [calendarData, setCalendarData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingStep, setBookingStep] = useState(1);
  const [additionalGuests, setAdditionalGuests] = useState(0);
  const [extraGuestPrice, setExtraGuestPrice] = useState(0);

  // ตรวจสอบว่าผู้ใช้เป็นแอดมินหรือไม่
  const isAdmin = user && user.role === 'admin';

  // ฟังก์ชันตรวจสอบและแปลงรูปภาพ
  const getImageUrl = (image) => {
    if (!image) return null;
    
    if (typeof image === 'string' && image.startsWith('data:image')) {
      return image;
    }
    
    if (typeof image === 'string') {
      return image;
    }
    
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

  // ฟังก์ชันโหลดข้อมูลวิลล่า
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

  // ฟังก์ชันโหลดข้อมูลปฏิทิน (แบบเว็บตัวอย่าง)
  const fetchCalendarData = async () => {
    try {
      // ข้อมูลปฏิทินตัวอย่างตามรูปแบบเว็บอ้างอิง
      const sampleData = {
        '2025-01-01': { status: 'available', price: 4900 },
        '2025-01-02': { status: 'available', price: 4900 },
        '2025-01-03': { status: 'booked', price: 4900 },
        '2025-01-04': { status: 'available', price: 4900 },
        '2025-01-05': { status: 'maintenance', price: 4900 },
        '2025-01-06': { status: 'available', price: 4900 },
        '2025-01-07': { status: 'long_holiday', price: 4900 },
        '2025-01-08': { status: 'available', price: 4900 },
        '2025-01-09': { status: 'booked', price: 4900 },
        '2025-01-10': { status: 'available', price: 4900 },
        '2025-01-11': { status: 'available', price: 4900 },
        '2025-01-12': { status: 'available', price: 4900 },
        '2025-01-13': { status: 'maintenance', price: 4900 },
        '2025-01-14': { status: 'available', price: 4900 },
        '2025-01-15': { status: 'available', price: 4900 },
        '2025-01-16': { status: 'long_holiday', price: 4900 },
        '2025-01-17': { status: 'available', price: 4900 },
        '2025-01-18': { status: 'booked', price: 4900 },
        '2025-01-19': { status: 'available', price: 4900 },
        '2025-01-20': { status: 'available', price: 4900 },
      };
      setCalendarData(sampleData);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  // ฟังก์ชันคำนวณจำนวนคืนและราคา
  const calculateBookingDetails = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setNights(diffDays);
    
    // คำนวณราคาพื้นฐาน
    const basePrice = diffDays * (villa?.pricePerNight || 0);
    
    // คำนวณราคาผู้เข้าพักเพิ่ม (300 บาท/คน/คืน)
    const extraPrice = additionalGuests > 0 ? additionalGuests * 300 * diffDays : 0;
    
    setTotalPrice(basePrice + extraPrice);
    setExtraGuestPrice(extraPrice);
  };

  // ฟังก์ชันจัดการการเลือกวันที่แบบเว็บตัวอย่าง
  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const dateData = calendarData[dateString];
    
    if (!dateData || dateData.status !== 'available') return;
    
    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      // เลือกเช็คอินใหม่
      setSelectedDates({
        checkIn: dateString,
        checkOut: null
      });
      setAdditionalGuests(0);
    } else if (date > new Date(selectedDates.checkIn)) {
      // เลือกเช็คเอาท์
      setSelectedDates(prev => ({
        ...prev,
        checkOut: dateString
      }));
      calculateBookingDetails(selectedDates.checkIn, dateString);
    }
  };

  // ฟังก์ชันสร้างปฏิทินแบบเว็บตัวอย่าง
  const generateCalendar = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const calendar = [];
    
    // เพิ่มวันว่างก่อนวันแรกของเดือน
    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.push(null);
    }
    
    // เพิ่มวันในเดือน
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      const dateString = date.toISOString().split('T')[0];
      const dateData = calendarData[dateString] || { status: 'unknown' };
      
      calendar.push({
        date,
        dateString,
        ...dateData
      });
    }
    
    return calendar;
  };

  // ฟังก์ชันรับชื่อสถานะภาษาไทย
  const getStatusText = (status) => {
    switch (status) {
      case 'booked': return 'มีจองแล้ว';
      case 'maintenance': return 'ปิดปรับปรุง-ซ่อม';
      case 'long_holiday': return 'ร้านหยุดยาว-นักท่องเที่ยว';
      case 'available': return 'ว่าง';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  // ฟังก์ชันจัดการจำนวนผู้เข้าพักเพิ่ม
  const handleAdditionalGuestsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setAdditionalGuests(value);
    
    // คำนวณราคาใหม่เมื่อจำนวนผู้เข้าพักเปลี่ยน
    if (selectedDates.checkIn && selectedDates.checkOut) {
      calculateBookingDetails(selectedDates.checkIn, selectedDates.checkOut);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      calculateBookingDetails(selectedDates.checkIn, selectedDates.checkOut);
    }
  }, [selectedDates, villa, additionalGuests]);

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

            {/* ส่วนปฏิทินการจองแบบเว็บตัวอย่าง */}
            {bookingStep === 1 && (
              <div className="villa-section">
                <h2 className="villa-section-title">ปฏิทินการจอง</h2>
                
                {/* สถานะวันที่แบบเว็บตัวอย่าง */}
                <div className="calendar-legend">
                  <div className="legend-item">
                    <span className="status-color available"></span>
                    <span>ว่าง</span>
                  </div>
                  <div className="legend-item">
                    <span className="status-color booked"></span>
                    <span>มีจองแล้ว</span>
                  </div>
                  <div className="legend-item">
                    <span className="status-color maintenance"></span>
                    <span>ปิดปรับปรุง-ซ่อม</span>
                  </div>
                  <div className="legend-item">
                    <span className="status-color long_holiday"></span>
                    <span>ร้านหยุดยาว-นักท่องเที่ยว</span>
                  </div>
                </div>
                
                {/* ปฏิทิน */}
                <div className="booking-calendar">
                  <div className="calendar-header">
                    <button 
                      className="calendar-nav"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    >
                      &lt;
                    </button>
                    <h3>
                      {currentMonth.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      className="calendar-nav"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    >
                      &gt;
                    </button>
                  </div>
                  
                  <div className="calendar-grid">
                    <div className="calendar-weekdays">
                      {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                        <div key={day} className="weekday">{day}</div>
                      ))}
                    </div>
                    
                    <div className="calendar-days">
                      {generateCalendar(currentMonth).map((day, index) => (
                        <div 
                          key={index}
                          className={`calendar-day ${!day ? 'empty' : ''} ${day?.status || ''} ${
                            selectedDates.checkIn === day?.dateString ? 'check-in' : ''
                          } ${
                            selectedDates.checkOut === day?.dateString ? 'check-out' : ''
                          } ${
                            day?.dateString && selectedDates.checkIn && selectedDates.checkOut && 
                            day.dateString > selectedDates.checkIn && day.dateString < selectedDates.checkOut ? 'selected-range' : ''
                          }`}
                          onClick={() => day && handleDateSelect(day.date)}
                          title={day ? getStatusText(day.status) : ''}
                        >
                          {day ? day.date.getDate() : ''}
                          {day?.status !== 'available' && day?.status !== 'unknown' && (
                            <div className="status-indicator"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* สรุปการจองแบบเว็บตัวอย่าง */}
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <div className="booking-summary">
                    <h3>สรุปการจอง</h3>
                    <div className="summary-details">
                      <div className="detail-item">
                        <span>วันที่เช็คอิน:</span>
                        <span>{new Date(selectedDates.checkIn).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="detail-item">
                        <span>วันที่เช็คเอาท์:</span>
                        <span>{new Date(selectedDates.checkOut).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="detail-item">
                        <span>จำนวนคืน:</span>
                        <span>{nights} คืน</span>
                      </div>
                      <div className="detail-item">
                        <span>ราคาต่อคืน:</span>
                        <span>฿{villa.pricePerNight.toLocaleString('th-TH')}</span>
                      </div>
                      
                      {/* ส่วนเพิ่มผู้เข้าพัก */}
                      <div className="detail-item">
                        <span>ผู้เข้าพักเพิ่ม (300 บาท/คน/คืน):</span>
                        <select 
                          value={additionalGuests} 
                          onChange={handleAdditionalGuestsChange}
                          className="guest-select"
                        >
                          {[0, 1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>
                              {num} คน
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {additionalGuests > 0 && (
                        <div className="detail-item">
                          <span>ค่าผู้เข้าพักเพิ่ม:</span>
                          <span>฿{extraGuestPrice.toLocaleString('th-TH')}</span>
                        </div>
                      )}
                      
                      <div className="detail-item total">
                        <span>ราคารวม:</span>
                        <span>฿{totalPrice.toLocaleString('th-TH')}</span>
                      </div>
                    </div>
                    
                    <div className="booking-actions">
                      <button 
                        className="btn-book-now"
                        onClick={() => setBookingStep(2)}
                      >
                        ดำเนินการจอง
                      </button>
                      <button 
                        className="btn-contact"
                        onClick={() => window.open('https://line.me/R/ti/p/@homehug', '_blank')}
                      >
                        <i className="fab fa-line"></i>
                        ติดต่อแอดมิน
                      </button>
                    </div>
                    
                    {/* หมายเหตุแบบเว็บตัวอย่าง */}
                    <div className="booking-notes">
                      <p><strong>หมายเหตุ:</strong></p>
                      <ul>
                        <li>ราคานี้เป็นราคาวันธรรมดาเท่านั้น</li>
                        <li>คนเกินเสริมท่านละ 300 บาท/คืน (สูงสุด 8 ท่าน)</li>
                        <li>ขอรักษาสิทธิ์จองสำหรับลูกค้าที่โอนเงินก่อนเท่านั้น</li>
                      </ul>
                    </div>
                  </div>
                )}
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

          {/* Right Column - Booking Form (แสดงเมื่อถึงขั้นตอนที่ 2) */}
          {bookingStep === 2 && (
            <div className="booking-form-container">
              <div className="booking-form">
                <BookingForm 
                  villa={villa} 
                  selectedDates={selectedDates}
                  additionalGuests={additionalGuests}
                  totalPrice={totalPrice}
                  onBookingSuccess={(booking) => {
                    window.location.href = `/booking-confirmation/${booking._id}`;
                  }} 
                  onBack={() => setBookingStep(1)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillaDetail;