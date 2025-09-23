import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css'; // นำเข้า CSS เฉพาะสำหรับหน้า Booking

const Booking = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    villa: null,
    specialRequests: ''
  });

  const villas = [
    {
      id: 1,
      name: "Home Hug poolvilla",
      location: "พัทยา, ประเทศไทย",
      price: 12500,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1",
      features: ["สระว่ายน้ำส่วนตัว", "วิวทะเล", "4 ผู้เข้าพัก", "3 ห้องนอน"],
      guests: 4,
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 2,
      name: "Home Hug poolvilla",
      location: "พัทยา, ประเทศไทย",
      price: 18900,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1",
      features: ["อินฟินิตี้พูล", "ทางเข้าหาดส่วนตัว", "6 ผู้เข้าพัก", "4 ห้องนอน"],
      guests: 6,
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 3,
      name: "Home Hug poolvilla",
      location: "พัทยา, ประเทศไทย",
      price: 9800,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1",
      features: ["วิวพระอาทิตย์ตก", "สวนส่วนตัว", "4 ผู้เข้าพัก", "2 ห้องนอน"],
      guests: 4,
      bedrooms: 2,
      bathrooms: 2
    }
  ];

  const handleVillaSelect = (villa) => {
    setBookingData({...bookingData, villa});
    setBookingStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({...bookingData, [name]: value});
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return bookingData.villa ? nights * bookingData.villa.price : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingStep(3);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="booking-page">
      {/* Header */}
      <header className="booking-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <i className="fas fa-home logo-icon"></i>
              <span className="logo-text">HomeHug</span>
            </Link>
            
            <div className="booking-steps">
              {[1, 2, 3].map(step => (
                <div key={step} className={`booking-step ${bookingStep >= step ? 'step-active' : ''}`}>
                  <div className="step-number">{step}</div>
                  <div className="step-title">
                    {step === 1 && 'เลือกวิลล่า'}
                    {step === 2 && 'กรอกข้อมูล'}
                    {step === 3 && 'ยืนยัน'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="booking-content">
        <div className="container">
          <div className="booking-hero">
            <h1 className="booking-hero-title">จองวิลล่าของคุณ</h1>
            <p className="booking-hero-subtitle">เลือกวิลล่าในฝันและวันที่ต้องการเพื่อการพักผ่อนที่สมบูรณ์แบบ</p>
          </div>

          {/* Step 1: Villa Selection */}
          {bookingStep === 1 && (
            <div className="villas-grid">
              {villas.map(villa => (
                <div 
                  key={villa.id} 
                  className="villa-card"
                  onClick={() => handleVillaSelect(villa)}
                >
                  <div className="villa-image">
                    <img src={villa.image} alt={villa.name} />
                    <div className="villa-price-tag">
                      ฿{villa.price.toLocaleString('th-TH')}
                    </div>
                  </div>
                  <div className="villa-content">
                    <h3 className="villa-name">{villa.name}</h3>
                    <p className="villa-location">
                      <i className="fas fa-map-marker-alt"></i>
                      {villa.location}
                    </p>
                    <div className="villa-features">
                      {villa.features.map((feature, index) => (
                        <span key={index} className="villa-feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button className="villa-select-btn">
                      เลือกวิลล่านี้
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Booking Form */}
          {bookingStep === 2 && (
            <div className="booking-form-container">
              <div className="booking-form-grid">
                {/* Left Side - Form */}
                <div className="booking-form-section">
                  <h2 className="form-section-title">รายละเอียดการจอง</h2>
                  
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">วันที่เช็คอิน</label>
                        <div className="form-input-wrapper">
                          <input
                            type="date"
                            name="checkIn"
                            value={bookingData.checkIn}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                          />
                          <i className="fas fa-calendar-day input-icon"></i>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">วันที่เช็คเอาท์</label>
                        <div className="form-input-wrapper">
                          <input
                            type="date"
                            name="checkOut"
                            value={bookingData.checkOut}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                          />
                          <i className="fas fa-calendar-check input-icon"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">จำนวนผู้เข้าพัก</label>
                      <div className="form-input-wrapper">
                        <select
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'ผู้ใหญ่' : 'ผู้ใหญ่'}</option>
                          ))}
                        </select>
                        <i className="fas fa-users input-icon"></i>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">คำขอพิเศษ (ถ้ามี)</label>
                      <textarea
                        name="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={handleInputChange}
                        rows="4"
                        className="form-textarea"
                        placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary booking-submit-btn">
                      <i className="fas fa-check-circle"></i>
                      ดำเนินการจอง
                    </button>
                  </form>
                </div>
                
                {/* Right Side - Summary */}
                <div className="booking-summary-section">
                  <h3 className="summary-title">สรุปการจอง</h3>
                  
                  {bookingData.villa && (
                    <>
                      {/* Villa Card */}
                      <div className="summary-villa-card">
                        <div className="summary-villa">
                          <div className="summary-villa-image">
                            <img src={bookingData.villa.image} alt={bookingData.villa.name} />
                          </div>
                          <div className="summary-villa-details">
                            <h4 className="villa-name">{bookingData.villa.name}</h4>
                            <p className="villa-location">{bookingData.villa.location}</p>
                            <div className="villa-price">
                              <i className="fas fa-tag"></i>
                              ฿{bookingData.villa.price.toLocaleString('th-TH')}/คืน
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Booking Details */}
                      <div className="booking-details">
                        <div className="summary-item">
                          <span className="summary-label">จำนวนคืน</span>
                          <span className="summary-value">
                            {bookingData.checkIn && bookingData.checkOut 
                              ? `${calculateNights()} คืน` 
                              : '-'
                            }
                          </span>
                        </div>
                        
                        <div className="summary-item">
                          <span className="summary-label">ค่าที่พัก</span>
                          <span className="summary-value">
                            ฿{calculateTotal().toLocaleString('th-TH')}
                          </span>
                        </div>
                        
                        <div className="summary-item">
                          <span className="summary-label">ค่าบริการ</span>
                          <span className="summary-value">฿500</span>
                        </div>
                        
                        <div className="summary-total">
                          <span>รวมทั้งหมด</span>
                          <span className="total-price">
                            ฿{(calculateTotal() + 500).toLocaleString('th-TH')}
                          </span>
                        </div>
                      </div>
                      
                      {/* Additional Info */}
                      <div className="booking-info">
                        <div className="info-icon">
                          <i className="fas fa-info-circle"></i>
                        </div>
                        <p className="info-text">
                          การยืนยันการจองจะถูกส่งไปยังอีเมลของคุณภายใน 24 ชั่วโมง
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {bookingStep === 3 && (
            <div className="booking-confirmation">
              <div className="confirmation-icon">
                <i className="fas fa-check"></i>
              </div>
              
              <h2 className="confirmation-title">การจองเสร็จสมบูรณ์!</h2>
              <p className="confirmation-message">
                ขอบคุณที่เลือก HomeHug สำหรับการพักผ่อนของคุณ 
                เราได้ส่งอีเมลยืนยันการจองไปยังอีเมลของคุณแล้ว
              </p>
              
              <div className="confirmation-details">
                <h3 className="details-title">รายละเอียดการจอง</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <p className="detail-label">วิลล่า</p>
                    <p className="detail-value">{bookingData.villa.name}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">ที่ตั้ง</p>
                    <p className="detail-value">{bookingData.villa.location}</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">วันที่เข้าพัก</p>
                    <p className="detail-value">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">จำนวนคืน</p>
                    <p className="detail-value">{calculateNights()} คืน</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">ผู้เข้าพัก</p>
                    <p className="detail-value">{bookingData.guests} คน</p>
                  </div>
                  <div className="detail-item">
                    <p className="detail-label">หมายเลขอ้างอิง</p>
                    <p className="detail-value reference">
                      HH{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="confirmation-actions">
                <Link to="/villas" className="btn btn-secondary">
                  <i className="fas fa-search"></i>
                  ดูวิลล่าอื่น ๆ
                </Link>
                <Link to="/" className="btn btn-primary">
                  <i className="fas fa-home"></i>
                  กลับสู่หน้าหลัก
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;