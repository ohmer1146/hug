import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">เกี่ยวกับเรา</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Home Hug Pool Villas - ให้ประสบการณ์การพักผ่อนในวิลล่าระดับพรีเมียมที่สมบูรณ์แบบ
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">เรื่องราวของเรา</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                ก่อตั้งขึ้นในปี 2077, Home Hug Pool Villas เกิดขึ้นจากความหลงใหลในการมอบประสบการณ์การพักผ่อนที่พิเศษสุด
                ในสถานที่ที่สวยงามที่สุดของประเทศไทย เราเข้าใจดีว่าการพักผ่อนที่สมบูรณ์แบบต้องการมากกว่าแค่ที่พัก
                มันคือการสร้างความทรงจำที่คงอยู่ตลอดไป
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                คอลเลกชันวิลล่าสระน้ำส่วนตัวระดับหรูของเราคัดสรรมาอย่างดี 
                เพื่อมอบความเป็นส่วนตัว ความสบาย และการต้อนรับแบบไทยแท้ 
                เพื่อให้ทุกช่วงเวลาของการพักผ่อนของคุณไม่ธรรมดาอย่างแน่นอน
              </p>
              <Link 
                to="/villas" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ดูวิลล่าของเรา
              </Link>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Luxury Villa" 
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Swimming Pool" 
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">พันธกิจ</h3>
              <p className="text-gray-600">
                มอบประสบการณ์การพักผ่อนระดับพรีเมียมผ่านคอลเลกชันวิลล่าสระน้ำส่วนตัวเอกclusively 
                ของเรา โดยรวมกันระหว่างสถานที่ที่สวยงามและบริการที่ยอดเยี่ยม
              </p>
            </div>
            
            <div className="text-center p-8 bg-purple-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">วิสัยทัศน์</h3>
              <p className="text-gray-600">
                เป็นผู้ให้บริการเช่าวิลล่าระดับหรูที่เชื่อถือได้มากที่สุดของประเทศไทย 
                เป็นที่รู้จักจากการสร้างประสบการณ์ที่ยากจะลืมเลือนในสถานที่ที่สวยงามที่สุดของโลก
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">ทีมงานของเรา</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">โอเบ็นเท็น</h3>
              <p className="text-blue-600 mb-2">ผู้ก่อตั้ง</p>
              <p className="text-gray-600">ผู้ที่มีความหลงใหลในการบริการและความพึงพอใจของลูกค้า</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">โอเบ็นเท็น</h3>
              <p className="text-blue-600 mb-2">ผู้จัดการทั่วไป</p>
              <p className="text-gray-600">ดูแลการดำเนินงานทั้งหมดและรับรองประสบการณ์ที่ดีที่สุด</p>
            </div>
            
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Team Member" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">โอเบ็นเท็น</h3>
              <p className="text-blue-600 mb-2">หัวหน้าฝ่ายบริการลูกค้า</p>
              <p className="text-gray-600">พร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">พร้อมสำหรับการพักผ่อนที่สมบูรณ์แบบ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            เริ่มต้นการเดินทางของคุณกับเราและค้นพบความหรูหราในแบบของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/villas" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              ดูวิลล่าทั้งหมด
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;