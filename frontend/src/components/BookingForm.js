import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, differenceInDays } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';

const BookingForm = ({ villa, onBookingSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // สถานะฟอร์ม
  const [formData, setFormData] = useState({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    infants: 0,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: ''
  });

  // ฟิลเตอร์วันที่ (ไม่อนุญาตให้เลือกวันที่ย้อนหลัง)
  const isDateDisabled = (date) => {
    return date < new Date().setHours(0, 0, 0, 0);
  };

  // คำนวณจำนวนคืน
  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const nights = differenceInDays(formData.checkOut, formData.checkIn);
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  // คำนวณราคารวม
  const calculateTotal = () => {
    const nights = calculateNights();
    const basePrice = villa.pricePerNight * nights;
    const serviceFee = basePrice * 0.1; // ค่าบริการ 10%
    const cleaningFee = 500; // ค่าทำความสะอาด
    return {
      nights,
      basePrice,
      serviceFee,
      cleaningFee,
      total: basePrice + serviceFee + cleaningFee
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFormData(prev => ({
      ...prev,
      checkIn: start,
      checkOut: end
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        villaId: villa._id,
        villaName: villa.name,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: {
          adults: parseInt(formData.adults),
          children: parseInt(formData.children),
          infants: parseInt(formData.infants)
        },
        guestInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        specialRequests: formData.specialRequests,
        totalPrice: calculateTotal().total,
        status: 'pending'
      };

      const response = await fetch('https://homehuggroup.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const result = await response.json();
        onBookingSuccess(result);
      } else {
        throw new Error('การจองล้มเหลว');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการจอง: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotal();

  return (
    <div className="booking-form-container">
      <div className="booking-price-section">
        <div className="price-display">
          <span className="price-amount">฿{villa.pricePerNight.toLocaleString('th-TH')}</span>
          <span className="price-period">/ คืน</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* ส่วนเลือกวันที่ */}
        <div className="form-section">
          <label className="form-label">วันที่เข้าพัก</label>
          <div className="date-picker-container">
            <DatePicker
              selected={formData.checkIn}
              onChange={handleDateChange}
              startDate={formData.checkIn}
              endDate={formData.checkOut}
              selectsRange
              minDate={new Date()}
              filterDate={isDateDisabled}
              monthsShown={2}
              className="date-picker-input"
              placeholderText="เลือกวันที่เช็คอิน - เช็คเอาท์"
              dateFormat="dd/MM/yyyy"
            />
            <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* ส่วนเลือกจำนวนผู้เข้าพัก */}
        <div className="form-section">
          <label className="form-label">ผู้เข้าพัก</label>
          <div className="guests-selector">
            <div className="guest-type">
              <div className="guest-info">
                <span className="guest-label">ผู้ใหญ่</span>
                <span className="guest-age">อายุ 13+</span>
              </div>
              <div className="guest-counter">
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    adults: Math.max(1, prev.adults - 1) 
                  }))}
                >
                  -
                </button>
                <span className="guest-count">{formData.adults}</span>
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    adults: Math.min(villa.capacity, prev.adults + 1) 
                  }))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="guest-type">
              <div className="guest-info">
                <span className="guest-label">เด็ก</span>
                <span className="guest-age">อายุ 2-12</span>
              </div>
              <div className="guest-counter">
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    children: Math.max(0, prev.children - 1) 
                  }))}
                >
                  -
                </button>
                <span className="guest-count">{formData.children}</span>
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    children: Math.min(villa.capacity - formData.adults, prev.children + 1) 
                  }))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="guest-type">
              <div className="guest-info">
                <span className="guest-label">ทารก</span>
                <span className="guest-age">อายุต่ำกว่า 2</span>
              </div>
              <div className="guest-counter">
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    infants: Math.max(0, prev.infants - 1) 
                  }))}
                >
                  -
                </button>
                <span className="guest-count">{formData.infants}</span>
                <button 
                  type="button"
                  className="counter-btn"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    infants: prev.infants + 1 
                  }))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* สรุปราคา */}
        {totals.nights > 0 && (
          <div className="price-summary">
            <div className="price-line">
              <span>฿{villa.pricePerNight.toLocaleString('th-TH')} x {totals.nights} คืน</span>
              <span>฿{totals.basePrice.toLocaleString('th-TH')}</span>
            </div>
            <div className="price-line">
              <span>ค่าบริการ</span>
              <span>฿{totals.serviceFee.toLocaleString('th-TH')}</span>
            </div>
            <div className="price-line">
              <span>ค่าทำความสะอาด</span>
              <span>฿{totals.cleaningFee.toLocaleString('th-TH')}</span>
            </div>
            <div className="price-total">
              <span>รวมทั้งหมด</span>
              <span>฿{totals.total.toLocaleString('th-TH')}</span>
            </div>
          </div>
        )}

        {/* ข้อมูลผู้จอง */}
        <div className="form-section">
          <h3 className="section-title">ข้อมูลผู้จอง</h3>
          <div className="name-fields">
            <div className="form-group">
              <label className="form-label">ชื่อ</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">นามสกุล</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">อีเมล</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">คำขอพิเศษ (ถ้ามี)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
              placeholder="เช่น อาหารเจ, เตียงเสริม, ฯลฯ"
            />
          </div>
        </div>

        {/* ปุ่มจอง */}
        <button 
          type="submit" 
          className="booking-button"
          disabled={loading || !formData.checkIn || !formData.checkOut}
        >
          {loading ? (
            <>
              <svg className="spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
              กำลังดำเนินการ...
            </>
          ) : (
            `จองตอนนี้ - ฿${totals.total > 0 ? totals.total.toLocaleString('th-TH') : '0'}`
          )}
        </button>

        <div className="booking-note">
          <p>คุณจะไม่ถูกเรียกเก็บเงินทันที การยืนยันการจองจะถูกส่งไปยังอีเมลของคุณ</p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;