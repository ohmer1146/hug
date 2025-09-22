import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`https://homehuggroup.onrender.com/api/bookings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="confirmation-loading">
        <div className="spinner"></div>
        <p>กำลังโหลดข้อมูลการจอง...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="confirmation-error">
        <h2>ไม่พบข้อมูลการจอง</h2>
        <Link to="/villas" className="back-button">กลับไปหน้ารายการวิลล่า</Link>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>การจองเสร็จสมบูรณ์!</h1>
          <p>ขอบคุณที่เลือก HomeHug เราจะส่งอีเมลยืนยันไปยัง {booking.guestInfo.email}</p>
        </div>

        <div className="confirmation-details">
          <div className="detail-section">
            <h2>รายละเอียดการจอง</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span>หมายเลขอ้างอิง</span>
                <strong>{booking._id}</strong>
              </div>
              <div className="detail-item">
                <span>วันที่จอง</span>
                <span>{new Date(booking.createdAt).toLocaleDateString('th-TH')}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>ข้อมูลที่พัก</h2>
            <div className="villa-info">
              <h3>{booking.villaName}</h3>
              <div className="stay-details">
                <div className="date-range">
                  <span>เช็คอิน: {new Date(booking.checkIn).toLocaleDateString('th-TH')}</span>
                  <span>เช็คเอาท์: {new Date(booking.checkOut).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="guests-info">
                  ผู้เข้าพัก: {booking.guests.adults} ผู้ใหญ่
                  {booking.guests.children > 0 && `, ${booking.guests.children} เด็ก`}
                  {booking.guests.infants > 0 && `, ${booking.guests.infants} ทารก`}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>ข้อมูลผู้จอง</h2>
            <div className="guest-info">
              <p>{booking.guestInfo.firstName} {booking.guestInfo.lastName}</p>
              <p>{booking.guestInfo.email}</p>
              <p>{booking.guestInfo.phone}</p>
            </div>
          </div>

          <div className="detail-section">
            <h2>สรุปราคา</h2>
            <div className="price-summary">
              <div className="price-line">
                <span>ค่าที่พัก</span>
                <span>฿{booking.totalPrice.toLocaleString('th-TH')}</span>
              </div>
              <div className="price-total">
                <span>รวมทั้งหมด</span>
                <span>฿{booking.totalPrice.toLocaleString('th-TH')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/villas" className="action-button secondary">ดูวิลล่าอื่นๆ</Link>
          <Link to="/" className="action-button primary">กลับสู่หน้าหลัก</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;