import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="absolute top-0 right-0 -mr-40 mt-20 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M45.1,-58.2C63.5,-47.1,85.7,-39.9,93.6,-23.8C101.5,-7.7,95.1,17.3,82.2,36.2C69.3,55.1,49.9,67.9,29.8,73.9C9.7,79.9,-11.1,79.1,-28.4,71.7C-45.7,64.3,-59.5,50.3,-68.3,33.1C-77.2,15.9,-81.1,-4.6,-75.8,-21.8C-70.5,-39.1,-56,-53.1,-40.1,-65.1C-24.2,-77.1,-7.1,-87.1,6.5,-87.8C20.1,-88.6,26.8,-69.3,45.1,-58.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="about-hero-content">
          <h1 className="about-hero-title">เกี่ยวกับ Home Hug</h1>
          <p className="about-hero-subtitle">
            เราคือผู้ให้บริการวิลล่าสระน้ำส่วนตัวระดับพรีเมียมที่มอบประสบการณ์การพักผ่อนที่ไม่เหมือนใคร
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-16 text-white" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 L0,100 L1000,100 L1000,0 Q500,150 0,0 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-image-container">
              <div className="about-image-decoration top-left"></div>
              <div className="about-image-decoration bottom-right"></div>
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Villa" 
                className="about-image"
              />
            </div>
            
            <div className="about-content">
              <h2>เรื่องราวของเรา</h2>
              <p>
                ก่อตั้งขึ้นในปี 2077 Home Hug เกิดขึ้นจากความหลงใหลในการมอบประสบการณ์การพักผ่อนที่พิเศษสุด
                ในสถานที่ที่สวยงามที่สุดของประเทศไทย เราเข้าใจดีว่าการพักผ่อนที่สมบูรณ์แบบต้องการมากกว่าแค่ที่พัก
                มันคือการสร้างความทรงจำที่คงอยู่ตลอดไป
              </p>
              <p>
                คอลเลกชันวิลล่าสระน้ำส่วนตัวระดับหรูของเราคัดสรรมาอย่างดี 
                เพื่อมอบความเป็นส่วนตัว ความสบาย และการต้อนรับแบบไทยแท้ 
                เพื่อให้ทุกช่วงเวลาของการพักผ่อนของคุณไม่ธรรมดาอย่างแน่นอน
              </p>
              
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon blue">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="feature-text">บริการระดับพรีเมียม</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon purple">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="feature-text">ที่ตั้งสวยงาม</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon blue">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="feature-text">สิ่งอำนวยความสะดวกครบครัน</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon purple">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="feature-text">การดูแลตลอด 24 ชม.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="about-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">วิลล่าให้เลือก</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">ผู้เข้าพัก</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">สถานที่</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="about-container">
          <div className="section-title">
            <h2>พันธกิจและวิสัยทัศน์</h2>
            <p>เรามุ่งมั่นที่จะสร้างประสบการณ์การพักผ่อนที่สมบูรณ์แบบสำหรับทุกท่าน</p>
          </div>
          
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3>พันธกิจ</h3>
              <p>
                มอบประสบการณ์การพักผ่อนระดับพรีเมียมผ่านคอลเลกชันวิลล่าสระน้ำส่วนตัวของเรา 
                โดยรวมกันระหว่างสถานที่ที่สวยงามและบริการที่ยอดเยี่ยม
              </p>
            </div>
            
            <div className="mission-card">
              <div className="mission-icon">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3>วิสัยทัศน์</h3>
              <p>
                เป็นผู้ให้บริการเช่าวิลล่าระดับหรูที่เชื่อถือได้มากที่สุดของประเทศไทย 
                เป็นที่รู้จักจากการสร้างประสบการณ์ที่ยากจะลืมเลือนในสถานที่ที่สวยงามที่สุด
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="about-container">
          <div className="section-title">
            <h2>ทีมงานของเรา</h2>
            <p>ทีมงานมืออาชีพที่พร้อมดูแลคุณตลอดการพักผ่อน</p>
          </div>
          
          <div className="team-grid">
            {[
              { name: "โอเบ็นเท็น", role: "ผู้ก่อตั้ง", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
              { name: "uset", role: "ผู้จัดการทั่วไป", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
              { name: "คุณโอ๊ต", role: "หัวหน้าฝ่ายบริการ", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
            ].map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="team-social">
                    <a href="#">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                      </svg>
                    </a>
                    <a href="#">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2 className="cta-title">พร้อมสำหรับการพักผ่อนที่สมบูรณ์แบบ?</h2>
        <p className="cta-text">
          เริ่มต้นการเดินทางของคุณกับเราและค้นพบความหรูหราในแบบของคุณ
        </p>
        <div className="cta-buttons">
          <Link to="/villas" className="cta-button primary">
            ดูวิลล่าทั้งหมด
          </Link>
          <Link to="/contact" className="cta-button secondary">
            ติดต่อเรา
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;