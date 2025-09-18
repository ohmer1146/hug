import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      name: "Grand Palace Villa",
      location: "พัทยา, ประเทศไทย",
      price: 12500,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["สระว่ายน้ำส่วนตัว", "วิวทะเล", "4 ผู้เข้าพัก", "3 ห้องนอน"],
      guests: 4,
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: 2,
      name: "Ocean Breeze Villa",
      location: "พัทยา, ประเทศไทย",
      price: 18900,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["อินฟินิตี้พูล", "ทางเข้าหาดส่วนตัว", "6 ผู้เข้าพัก", "4 ห้องนอน"],
      guests: 6,
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 3,
      name: "Royal Sunset Villa",
      location: "พัทยา, ประเทศไทย",
      price: 9800,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-purple-600">HomeHug</Link>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        bookingStep >= step 
                          ? 'bg-purple-600 border-purple-600 text-white' 
                          : 'border-gray-300 text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-sm mt-2 text-gray-600">
                      {step === 1 && 'เลือกวิลล่า'}
                      {step === 2 && 'กรอกข้อมูล'}
                      {step === 3 && 'ยืนยัน'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">จองวิลล่าของคุณ</h1>
            <p className="text-xl text-gray-600">เลือกวิลล่าในฝันและวันที่ต้องการเพื่อการพักผ่อนที่สมบูรณ์แบบ</p>
          </div>

          {/* Step 1: Villa Selection */}
          {bookingStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {villas.map(villa => (
                <div 
                  key={villa.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleVillaSelect(villa)}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={villa.image} 
                      alt={villa.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ฿{villa.price.toLocaleString('th-TH')}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{villa.name}</h3>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <i className="fas fa-map-marker-alt text-purple-500 mr-2"></i>
                      {villa.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {villa.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      เลือกวิลล่านี้
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Booking Form */}
          {bookingStep === 2 && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Side - Form */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">รายละเอียดการจอง</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">วันที่เช็คอิน</label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkIn"
                              value={bookingData.checkIn}
                              onChange={handleInputChange}
                              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                              required
                            />
                            <i className="fas fa-calendar-day absolute right-4 top-4 text-gray-400"></i>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">วันที่เช็คเอาท์</label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkOut"
                              value={bookingData.checkOut}
                              onChange={handleInputChange}
                              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                              required
                            />
                            <i className="fas fa-calendar-check absolute right-4 top-4 text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">จำนวนผู้เข้าพัก</label>
                        <div className="relative">
                          <select
                            name="guests"
                            value={bookingData.guests}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 appearance-none transition-all"
                            required
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'ผู้ใหญ่' : 'ผู้ใหญ่'}</option>
                            ))}
                          </select>
                          <i className="fas fa-users absolute right-4 top-4 text-gray-400"></i>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">คำขอพิเศษ (ถ้ามี)</label>
                        <textarea
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                          placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-1 shadow-lg"
                      >
                        <i className="fas fa-check-circle mr-2"></i>
                        ดำเนินการจอง
                      </button>
                    </form>
                  </div>
                  
                  {/* Right Side - Summary */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">สรุปการจอง</h3>
                    
                    {bookingData.villa && (
                      <>
                        {/* Villa Card */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={bookingData.villa.image} 
                              alt={bookingData.villa.name} 
                              className="w-20 h-20 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 text-lg">{bookingData.villa.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{bookingData.villa.location}</p>
                              <div className="flex items-center text-purple-600 font-semibold">
                                <i className="fas fa-tag mr-2"></i>
                                ฿{bookingData.villa.price.toLocaleString('th-TH')}/คืน
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Booking Details */}
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">จำนวนคืน</span>
                            <span className="font-semibold">
                              {bookingData.checkIn && bookingData.checkOut 
                                ? `${calculateNights()} คืน` 
                                : '-'
                              }
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">ค่าที่พัก</span>
                            <span className="font-semibold">
                              ฿{calculateTotal().toLocaleString('th-TH')}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">ค่าบริการ</span>
                            <span className="font-semibold">฿500</span>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span>รวมทั้งหมด</span>
                              <span className="text-purple-600">
                                ฿{(calculateTotal() + 500).toLocaleString('th-TH')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Additional Info */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                          <div className="flex items-start space-x-3">
                            <i className="fas fa-info-circle text-yellow-500 mt-1"></i>
                            <div>
                              <p className="text-yellow-800 text-sm">
                                การยืนยันการจองจะถูกส่งไปยังอีเมลของคุณภายใน 24 ชั่วโมง
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {bookingStep === 3 && (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-800 mb-4">การจองเสร็จสมบูรณ์!</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                ขอบคุณที่เลือก HomeHug สำหรับการพักผ่อนของคุณ 
                เราได้ส่งอีเมลยืนยันการจองไปยังอีเมลของคุณแล้ว
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">รายละเอียดการจอง</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">วิลล่า</p>
                    <p className="font-semibold text-lg">{bookingData.villa.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">ที่ตั้ง</p>
                    <p className="font-semibold text-lg">{bookingData.villa.location}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">วันที่เข้าพัก</p>
                    <p className="font-semibold text-lg">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">จำนวนคืน</p>
                    <p className="font-semibold text-lg">{calculateNights()} คืน</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">ผู้เข้าพัก</p>
                    <p className="font-semibold text-lg">{bookingData.guests} คน</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">หมายเลขอ้างอิง</p>
                    <p className="font-semibold text-lg text-purple-600">
                      HH{Math.floor(100000 + Math.random() * 900000)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/villas" 
                  className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-search mr-2"></i>
                  ดูวิลล่าอื่น ๆ
                </Link>
                <Link 
                  to="/" 
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-home mr-2"></i>
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