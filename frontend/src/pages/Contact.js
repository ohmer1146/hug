import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-container">
          <h1 className="contact-hero-title">ติดต่อเรา</h1>
          <p className="contact-hero-subtitle">
            เรายินดีให้คำปรึกษาและตอบคำถามทุกข้อสงสัยเกี่ยวกับการจองวิลล่า
          </p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="contact-info-title">ข้อมูลติดต่อ</h2>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>ที่อยู่</h3>
                <p>Home Hug Pool Villa Pattaya, Pattaya, Thailand, Chon Buri</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>โทรศัพท์</h3>
                <p>061-105-8068</p>
                <p>061-105-8068</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>อีเมล</h3>
                <p>aomsinliveindisneysland@gmail.com</p>
                <p>aomsinliveindisneysland@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="contact-info-content">
                <h3>เวลาทำการ</h3>
                <p>ทุกวัน 08:00 - 20:00 น.</p>
                <p>บริการตลอด 24 ชั่วโมงสำหรับการจองด่วน</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className="contact-form-title">ส่งข้อความถึงเรา</h2>
            <form className="contact-form">
              <div className="form-group">
                <label className="contact-form-label">ชื่อ</label>
                <input type="text" className="contact-form-input" placeholder="ชื่อของคุณ" />
              </div>
              
              <div className="form-group">
                <label className="contact-form-label">นามสกุล</label>
                <input type="text" className="contact-form-input" placeholder="นามสกุลของคุณ" />
              </div>
              
              <div className="form-group">
                <label className="contact-form-label">อีเมล</label>
                <input type="email" className="contact-form-input" placeholder="อีเมลของคุณ" />
              </div>
              
              <div className="form-group">
                <label className="contact-form-label">โทรศัพท์</label>
                <input type="tel" className="contact-form-input" placeholder="หมายเลขโทรศัพท์" />
              </div>
              
              <div className="form-group form-group-full">
                <label className="contact-form-label">หัวข้อ</label>
                <input type="text" className="contact-form-input" placeholder="หัวข้อข้อความ" />
              </div>
              
              <div className="form-group form-group-full">
                <label className="contact-form-label">ข้อความ</label>
                <textarea className="contact-form-textarea" placeholder="ข้อความของคุณ"></textarea>
              </div>
              
              <button type="submit" className="contact-form-button">
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="contact-map">
          <iframe 
            src="https://maps.app.goo.gl/j5eNPc4YmnE91nbd7" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="HomeHug Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;