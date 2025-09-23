// Booking.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Booking.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const villaId = searchParams.get('villaId');
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    nights: 0,
    adults: 2,
    children: 0,
    infants: 0,
    totalGuests: 2,
    villaPrice: 0,
    serviceFee: 500,
    totalPrice: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // ดึงข้อมูลวิลล่าจาก API
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch('https://homehuggroup.onrender.com/api/villas');
        if (response.ok) {
          const data = await response.json();
          setVillas(data);
          
          // หากมี villaId ใน URL ให้เลือกวิลล่านั้นโดยอัตโนมัติ
          if (villaId && data.length > 0) {
            const villa = data.find(v => v._id === villaId);
            if (villa) {
              setSelectedVilla(villa);
              setBookingData(prev => ({
                ...prev,
                villaPrice: villa.pricePerNight || 0
              }));
              setBookingStep(2);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching villas:', error);
        // ใช้ข้อมูลตัวอย่างหาก API ล้มเหลว
        useSampleVillas();
      } finally {
        setLoading(false);
      }
    };

    const useSampleVillas = () => {
      const sampleVillas = [
        {
          _id: "1",
          name: "Home Hug Pool Villa 1",
          description: "พูลวิลล่าสุดหรูในพัทยา พร้อมสระว่ายน้ำส่วนตัวและวิวทะเล",
          location: "พัทยา, ประเทศไทย",
          pricePerNight: 12500,
          images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg"],
          bedrooms: 3,
          bathrooms: 2,
          capacity: 6,
          amenities: ["สระว่ายน้ำส่วนตัว", "ที่จอดรถ", "WiFi", "เครื่องปรับอากาศ", "ทีวี"],
          area: "200 ตร.ม.",
          features: ["ใกล้ทะเล", "สระส่วนตัว", "ที่จอดรถฟรี"]
        },
        {
          _id: "2",
          name: "Home Hug Pool Villa 2", 
          description: "วิลล่าดีไซน์โมเดิร์นพร้อมอินฟินิตี้พูล",
          location: "พัทยา, ประเทศไทย",
          pricePerNight: 18900,
          images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg"],
          bedrooms: 4,
          bathrooms: 3,
          capacity: 8,
          amenities: ["อินฟินิตี้พูล", "สวนส่วนตัว", "ครัวพร้อม", "ที่จอดรถ"],
          area: "250 ตร.ม.",
          features: ["อินฟินิตี้พูล", "วิวทะเล", "ที่จอดรถฟรี"]
        },
        {
          _id: "3",
          name: "Home Hug Pool Villa 3",
          description: "วิลล่าขนาดกะทัดรัดเหมาะสำหรับครอบครัว",
          location: "พัทยา, ประเทศไทย", 
          pricePerNight: 9800,
          images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg"],
          bedrooms: 2,
          bathrooms: 2,
          capacity: 4,
          amenities: ["สระว่ายน้ำ", "ที่จอดรถ", "WiFi", "ระเบียง"],
          area: "150 ตร.ม.",
          features: ["สวนส่วนตัว", "ใกล้ห้าง", "ที่จอดรถฟรี"]
        }
      ];
      setVillas(sampleVillas);
      
      if (villaId) {
        const villa = sampleVillas.find(v => v._id === villaId);
        if (villa) {
          setSelectedVilla(villa);
          setBookingStep(2);
        }
      }
    };

    fetchVillas();
  }, [villaId]);

  // คำนวณจำนวนคืนและราคารวม
  useEffect(() => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      const totalPrice = nights * bookingData.villaPrice + bookingData.serviceFee;
      
      setBookingData(prev => ({
        ...prev,
        nights: nights > 0 ? nights : 0,
        totalPrice: totalPrice > 0 ? totalPrice : 0
      }));
    }
  }, [bookingData.checkIn, bookingData.checkOut, bookingData.villaPrice]);

  const handleVillaSelect = (villa) => {
    setSelectedVilla(villa);
    setBookingData(prev => ({
      ...prev,
      villaPrice: villa.pricePerNight
    }));
    setBookingStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuestChange = (type, value) => {
    setBookingData(prev => {
      const newData = { ...prev, [type]: parseInt(value) };
      newData.totalGuests = newData.adults + newData.children;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // สร้างการจอง
    try {
      const bookingPayload = {
        villaId: selectedVilla._id,
        villaName: selectedVilla.name,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: {
          adults: bookingData.adults,
          children: bookingData.children,
          infants: bookingData.infants
        },
        guestInfo: {
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone
        },
        specialRequests: bookingData.specialRequests,
        totalPrice: bookingData.totalPrice,
        nights: bookingData.nights
      };

      const response = await fetch('https://homehuggroup.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        const booking = await response.json();
        setBookingStep(3);
        // บันทึก booking ID สำหรับ confirmation
        localStorage.setItem('lastBookingId', booking._id);
      } else {
        alert('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('เกิดข้อผิดพลาดในการจอง');
    }
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

  if (loading) {
    return (
      <div className="booking-loading">
        <div className="spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

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
              <div className={`booking-step ${bookingStep >= 1 ? 'step-active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-title">เลือกวิลล่า</div>
              </div>
              <div className={`booking-step ${bookingStep >= 2 ? 'step-active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-title">กรอกข้อมูล</div>
              </div>
              <div className={`booking-step ${bookingStep >= 3 ? 'step-active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-title">ยืนยันการจอง</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="booking-content">
        <div className="container">
          {/* Step 1: Villa Selection */}
          {bookingStep === 1 && (
            <>
              <div className="booking-hero">
                <h1>เลือกพูลวิลล่าในพัทยา</h1>
                <p>เรามีพูลวิลล่าหลักสวยในพัทยาให้คุณเลือกพักผ่อน</p>
              </div>

              <div className="villas-selection">
                {villas.map(villa => (
                  <div key={villa._id} className="villa-selection-card">
                    <div className="villa-image">
                      <img src={villa.images[0]} alt={villa.name} />
                      <div className="villa-badge">พัทยา</div>
                    </div>
                    <div className="villa-info">
                      <h3>{villa.name}</h3>
                      <div className="villa-features">
                        <span>🛏️ {villa.bedrooms} ห้องนอน</span>
                        <span>🚿 {villa.bathrooms} ห้องน้ำ</span>
                        <span>👥 {villa.capacity} คน</span>
                        <span>📐 {villa.area}</span>
                      </div>
                      <div className="villa-amenities">
                        {villa.features.map((feature, index) => (
                          <span key={index} className="amenity-tag">{feature}</span>
                        ))}
                      </div>
                      <div className="villa-price">
                        <span className="price">฿{villa.pricePerNight.toLocaleString()}</span>
                        <span className="price-label">/ คืน</span>
                      </div>
                      <button 
                        onClick={() => handleVillaSelect(villa)}
                        className="select-villa-btn"
                      >
                        เลือกวิลล่านี้
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Booking Form */}
          {bookingStep === 2 && selectedVilla && (
            <div className="booking-form-container">
              <div className="booking-form-header">
                <button onClick={() => setBookingStep(1)} className="back-button">
                  ← กลับไปเลือกวิลล่า
                </button>
                <h2>จอง {selectedVilla.name}</h2>
              </div>

              <div className="booking-form-grid">
                {/* Left Side - Form */}
                <div className="form-section">
                  <h3>ข้อมูลการจอง</h3>
                  
                  <div className="date-selection">
                    <div className="form-group">
                      <label>วันที่เช็คอิน</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>วันที่เช็คเอาท์</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        min={bookingData.checkIn}
                        required
                      />
                    </div>
                  </div>

                  <div className="guests-selection">
                    <h4>จำนวนผู้เข้าพัก</h4>
                    <div className="guest-types">
                      <div className="guest-type">
                        <label>ผู้ใหญ่</label>
                        <select
                          value={bookingData.adults}
                          onChange={(e) => handleGuestChange('adults', e.target.value)}
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num} คน</option>
                          ))}
                        </select>
                      </div>
                      <div className="guest-type">
                        <label>เด็ก</label>
                        <select
                          value={bookingData.children}
                          onChange={(e) => handleGuestChange('children', e.target.value)}
                        >
                          {[0,1,2,3,4].map(num => (
                            <option key={num} value={num}>{num} คน</option>
                          ))}
                        </select>
                      </div>
                      <div className="guest-type">
                        <label>ทารก</label>
                        <select
                          value={bookingData.infants}
                          onChange={(e) => handleGuestChange('infants', e.target.value)}
                        >
                          {[0,1,2].map(num => (
                            <option key={num} value={num}>{num} คน</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="guest-info">
                    <h4>ข้อมูลผู้จอง</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ชื่อ</label>
                        <input
                          type="text"
                          name="firstName"
                          value={bookingData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>นามสกุล</label>
                        <input
                          type="text"
                          name="lastName"
                          value={bookingData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>อีเมล</label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>โทรศัพท์</label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="special-requests">
                    <label>คำขอพิเศษ (ถ้ามี)</label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
                      rows="4"
                    />
                  </div>
                </div>

                {/* Right Side - Summary */}
                <div className="summary-section">
                  <div className="summary-card">
                    <h3>สรุปการจอง</h3>
                    <div className="villa-summary">
                      <img src={selectedVilla.images[0]} alt={selectedVilla.name} />
                      <div className="villa-details">
                        <h4>{selectedVilla.name}</h4>
                        <p>พัทยา, ประเทศไทย</p>
                        <div className="villa-specs">
                          <span>🛏️ {selectedVilla.bedrooms} ห้องนอน</span>
                          <span>👥 {selectedVilla.capacity} คน</span>
                        </div>
                      </div>
                    </div>

                    <div className="price-breakdown">
                      <div className="price-item">
                        <span>฿{selectedVilla.pricePerNight.toLocaleString()} x {bookingData.nights} คืน</span>
                        <span>฿{(selectedVilla.pricePerNight * bookingData.nights).toLocaleString()}</span>
                      </div>
                      <div className="price-item">
                        <span>ค่าบริการ</span>
                        <span>฿{bookingData.serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="price-total">
                        <span>รวมทั้งหมด</span>
                        <span>฿{bookingData.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <button onClick={handleSubmit} className="confirm-booking-btn">
                      ยืนยันการจอง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {bookingStep === 3 && (
            <div className="confirmation-page">
              <div className="confirmation-content">
                <div className="success-icon">✓</div>
                <h2>การจองเสร็จสมบูรณ์!</h2>
                <p>ขอบคุณที่เลือก HomeHug Pool Villa พัทยา</p>
                
                <div className="confirmation-details">
                  <div className="detail-item">
                    <span>หมายเลขอ้างอิง:</span>
                    <strong>HH{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <div className="detail-item">
                    <span>วิลล่า:</span>
                    <span>{selectedVilla.name}</span>
                  </div>
                  <div className="detail-item">
                    <span>วันที่เข้าพัก:</span>
                    <span>{formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}</span>
                  </div>
                  <div className="detail-item">
                    <span>จำนวนคืน:</span>
                    <span>{bookingData.nights} คืน</span>
                  </div>
                </div>

                <div className="confirmation-actions">
                  <Link to="/villas" className="btn-secondary">ดูวิลล่าอื่นๆ</Link>
                  <Link to="/" className="btn-primary">กลับสู่หน้าหลัก</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;