// BookingForm.js - แก้ไขให้สมบูรณ์ 100%
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './BookingForm.css';

const BookingForm = ({ villa, selectedDates, additionalGuests = 0, totalPrice = 0, onBookingSuccess, onBack }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    guests: 2,
    specialRequests: ''
  });

  // อัพเดทฟอร์มเมื่อวันที่เปลี่ยนแปลง
  useEffect(() => {
    if (selectedDates.checkIn && selectedDates.checkOut) {
      const start = new Date(selectedDates.checkIn);
      const end = new Date(selectedDates.checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      setFormData(prev => ({
        ...prev,
        checkIn: selectedDates.checkIn,
        checkOut: selectedDates.checkOut,
        nights: nights,
        totalPrice: totalPrice
      }));
    }
  }, [selectedDates, totalPrice]);

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

    setLoading(true);

    try {
      const bookingData = {
        villaId: villa._id,
        villaName: villa.name,
        ...formData,
        ...selectedDates,
        additionalGuests: additionalGuests,
        totalPrice: totalPrice,
        status: 'pending'
      };

      const response = await fetch('https://homehuggroup.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user ? `Bearer ${localStorage.getItem('token')}` : ''
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        onBookingSuccess(booking);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'เกิดข้อผิดพลาดในการจอง');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('เกิดข้อผิดพลาดในการจอง: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <div className="booking-form-header">
        <button className="btn-back" onClick={onBack}>
          &larr; กลับไปเลือกวันที่
        </button>
        <h3>กรอกข้อมูลการจอง</h3>
      </div>
      
      {selectedDates.checkIn && selectedDates.checkOut ? (
        <div className="booking-dates-summary">
          <p><strong>วันที่เข้าพัก:</strong> {new Date(selectedDates.checkIn).toLocaleDateString('th-TH')} - {new Date(selectedDates.checkOut).toLocaleDateString('th-TH')}</p>
          <p><strong>จำนวนคืน:</strong> {formData.nights} คืน</p>
          <p><strong>ผู้เข้าพักเพิ่ม:</strong> {additionalGuests} คน</p>
          <p><strong>ราคารวม:</strong> ฿{totalPrice.toLocaleString('th-TH')}</p>
        </div>
      ) : (
        <div className="booking-dates-alert">
          <p>กรุณาเลือกวันที่เข้าพักจากปฏิทินด้านซ้าย</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>ชื่อ</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>นามสกุล</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>อีเมล</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>จำนวนผู้เข้าพักหลัก</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} คน</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>คำขอพิเศษ</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows="3"
            placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onBack}>
            ยกเลิก
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading || !selectedDates.checkIn || !selectedDates.checkOut}
          >
            {loading ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;