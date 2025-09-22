import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`https://homehuggroup.onrender.com/api/bookings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          setError('ไม่พบข้อมูลการจอง');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลการจอง');
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="booking-confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-loading">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูลการจอง...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="booking-confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-error">
            <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2>{error || 'ไม่พบข้อมูลการจอง'}</h2>
            <p>กรุณาตรวจสอบหมายเลขอ้างอิงหรือติดต่อฝ่ายบริการลูกค้า</p>
            <Link to="/villas" className="back-button">กลับไปหน้ารายการวิลล่า</Link>
          </div>
        </div>
      </div>
    );
  }

  // ฟังก์ชันจัดรูปแบบวันที่
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="booking-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1>การจองเสร็จสมบูรณ์!</h1>
          <p>ขอบคุณที่เลือก HomeHug เราจะส่งอีเมลยืนยันไปยัง {booking.guestInfo?.email}</p>
        </div>

        <div className="confirmation-details">
          <div className="detail-section">
            <h2>รายละเอียดการจอง</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span>หมายเลขอ้างอิง</span>
                <strong>#{booking._id?.substring(0, 8).toUpperCase()}</strong>
              </div>
              <div className="detail-item">
                <span>วันที่จอง</span>
                <span>{formatDate(booking.createdAt)}</span>
              </div>
              <div className="detail-item">
                <span>สถานะ</span>
                <span className={`status-badge status-${booking.status}`}>
                  {booking.status === 'pending' && 'รอดำเนินการ'}
                  {booking.status === 'confirmed' && 'ยืนยันแล้ว'}
                  {booking.status === 'cancelled' && 'ยกเลิก'}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>ข้อมูลที่พัก</h2>
            <div className="villa-info">
              <h3>{booking.villaName}</h3>
              <div className="stay-details">
                <div className="date-range">
                  <div className="date-item">
                    <span className="date-label">เช็คอิน</span>
                    <span className="date-value">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">เช็คเอาท์</span>
                    <span className="date-value">{formatDate(booking.checkOut)}</span>
                  </div>
                </div>
                <div className="guests-info">
                  <strong>ผู้เข้าพัก:</strong> {booking.guests?.adults || 0} ผู้ใหญ่
                  {booking.guests?.children > 0 && `, ${booking.guests.children} เด็ก`}
                  {booking.guests?.infants > 0 && `, ${booking.guests.infants} ทารก`}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>ข้อมูลผู้จอง</h2>
            <div className="guest-info">
              <div className="guest-detail">
                <span className="guest-label">ชื่อ-นามสกุล</span>
                <span>{booking.guestInfo?.firstName} {booking.guestInfo?.lastName}</span>
              </div>
              <div className="guest-detail">
                <span className="guest-label">อีเมล</span>
                <span>{booking.guestInfo?.email}</span>
              </div>
              <div className="guest-detail">
                <span className="guest-label">โทรศัพท์</span>
                <span>{booking.guestInfo?.phone}</span>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="detail-section">
              <h2>คำขอพิเศษ</h2>
              <div className="special-requests">
                <p>{booking.specialRequests}</p>
              </div>
            </div>
          )}

          <div className="detail-section">
            <h2>สรุปราคา</h2>
            <div className="price-summary">
              <div className="price-line">
                <span>ค่าที่พัก</span>
                <span>฿{(booking.totalPrice || 0).toLocaleString('th-TH')}</span>
              </div>
              <div className="price-total">
                <span>รวมทั้งหมด</span>
                <span>฿{(booking.totalPrice || 0).toLocaleString('th-TH')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/villas" className="action-button secondary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            ดูวิลล่าอื่นๆ
          </Link>
          <Link to="/" className="action-button primary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            กลับสู่หน้าหลัก
          </Link>
        </div>

        <div className="confirmation-footer">
          <p>หากมีคำถามหรือต้องการเปลี่ยนแปลงการจอง กรุณาติดต่อเรา</p>
          <div className="contact-info">
            <span>โทร: 02-123-4567</span>
            <span>อีเมล: support@homehug.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;