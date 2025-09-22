// frontend/src/components/GuestBookingForm.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './GuestBookingForm.css';

const GuestBookingForm = ({ villa, selectedDates, additionalGuests = 0, totalPrice = 0, onBookingSuccess, onBack }) => {
  const { guestBooking, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    guests: 2,
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      alert('กรุณาเลือกวันที่เข้าพัก');
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        villaId: villa._id,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        guests: parseInt(formData.guests),
        additionalGuests: parseInt(additionalGuests),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
        totalPrice: totalPrice
      };

      const result = await guestBooking(bookingData);

      if (result.success) {
        onBookingSuccess(result.booking);
      } else {
        alert(result.message || 'เกิดข้อผิดพลาดในการจอง');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('เกิดข้อผิดพลาดในการจอง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guest-booking-form">
      <div className="booking-form-header">
        <button className="btn-back" onClick={onBack}>
          &larr; กลับไปเลือกวันที่
        </button>
        <h3>กรอกข้อมูลการจอง</h3>
      </div>
      
      <div className="booking-info-card">
        <h4>ข้อมูลการจอง</h4>
        <div className="booking-details">
          <p><strong>วิลล่า:</strong> {villa.name}</p>
          <p><strong>วันที่เข้าพัก:</strong> {new Date(selectedDates.checkIn).toLocaleDateString('th-TH')} - {new Date(selectedDates.checkOut).toLocaleDateString('th-TH')}</p>
          <p><strong>จำนวนคืน:</strong> {Math.ceil((new Date(selectedDates.checkOut) - new Date(selectedDates.checkIn)) / (1000 * 60 * 60 * 24))} คืน</p>
          <p><strong>ผู้เข้าพักหลัก:</strong> {formData.guests} คน</p>
          {additionalGuests > 0 && <p><strong>ผู้เข้าพักเพิ่ม:</strong> {additionalGuests} คน</p>}
          <p><strong>ราคารวม:</strong> ฿{totalPrice.toLocaleString('th-TH')}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>ข้อมูลผู้จอง</h4>
          <div className="form-row">
            <div className="form-group">
              <label>ชื่อ *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>นามสกุล *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>อีเมล *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>โทรศัพท์ *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>ข้อมูลเพิ่มเติม</h4>
          <div className="form-group">
            <label>คำขอพิเศษ (ถ้ามี)</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="3"
              placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
            />
          </div>
        </div>

        <div className="booking-terms">
          <p>
            <strong>เงื่อนไขการจอง:</strong> การจองจะสมบูรณ์เมื่อชำระเงินเรียบร้อย 
            กรุณาชำระเงินภายใน 24 ชั่วโมง มิฉะะนั้นการจองจะถูกยกเลิกอัตโนมัติ
          </p>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            ยกเลิก
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestBookingForm;