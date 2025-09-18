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
      location: "Pattaya, Thailand",
      price: 12500,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Private Pool", "Ocean View", "4 Guests", "3 Bedrooms"]
    },
    {
      id: 2,
      name: "Ocean Breeze Villa",
      location: "Pattaya, Thailand",
      price: 18900,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Infinity Pool", "Beach Access", "6 Guests", "4 Bedrooms"]
    },
    {
      id: 3,
      name: "Royal Sunset Villa",
      location: "Pattaya, Thailand",
      price: 9800,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Sunset View", "Private Garden", "4 Guests", "2 Bedrooms"]
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-600">HomeHug</Link>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {[1, 2, 3].map(step => (
                  <div 
                    key={step} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      bookingStep >= step 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">จองวิลล่าของคุณ</h1>
          <p className="text-gray-600 text-center mb-12">เลือกวิลล่าในฝันและวันที่ต้องการเพื่อการพักผ่อนที่สมบูรณ์แบบ</p>

          {/* Step 1: Villa Selection */}
          {bookingStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {villas.map(villa => (
                <div 
                  key={villa.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleVillaSelect(villa)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={villa.image} 
                      alt={villa.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{villa.name}</h3>
                    <p className="text-gray-600 mb-4">{villa.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {villa.features.map((feature, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">฿{villa.price.toLocaleString()}</span>
                      <span className="text-gray-500">/คืน</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Booking Form */}
          {bookingStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">รายละเอียดการจอง</h2>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เช็คอิน</label>
                          <input
                            type="date"
                            name="checkIn"
                            value={bookingData.checkIn}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เช็คเอาท์</label>
                          <input
                            type="date"
                            name="checkOut"
                            value={bookingData.checkOut}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนผู้เข้าพัก</label>
                        <select
                          name="guests"
                          value={bookingData.guests}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'ผู้ใหญ่' : 'ผู้ใหญ่'}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">คำขอพิเศษ (ถ้ามี)</label>
                        <textarea
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="เช่น ต้องการเตียงเสริม, อาหารเจ, ฯลฯ"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        ดำเนินการจอง
                      </button>
                    </form>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">สรุปการจอง</h3>
                      
                      {bookingData.villa && (
                        <>
                          <div className="flex items-center mb-6">
                            <img 
                              src={bookingData.villa.image} 
                              alt={bookingData.villa.name} 
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <h4 className="font-semibold text-gray-800">{bookingData.villa.name}</h4>
                              <p className="text-gray-600 text-sm">{bookingData.villa.location}</p>
                              <p className="text-blue-600 font-semibold">฿{bookingData.villa.price.toLocaleString()}/คืน</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                              <span className="text-gray-600">วันที่เข้าพัก</span>
                              <span className="font-medium">
                                {bookingData.checkIn && bookingData.checkOut 
                                  ? `${calculateNights()} คืน` 
                                  : 'เลือกวันที่'
                                }
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600">ค่าที่พัก</span>
                              <span className="font-medium">
                                ฿{calculateTotal().toLocaleString()}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600">ค่าบริการ</span>
                              <span className="font-medium">฿500</span>
                            </div>
                            
                            <div className="border-t pt-4">
                              <div className="flex justify-between text-lg font-bold">
                                <span>รวมทั้งหมด</span>
                                <span className="text-blue-600">
                                  ฿{(calculateTotal() + 500).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {bookingStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">การจองเสร็จสมบูรณ์!</h2>
              <p className="text-gray-600 mb-8">
                ขอบคุณที่เลือก HomeHug สำหรับการพักผ่อนของคุณ 
                เราได้ส่งอีเมลยืนยันการจองไปยังอีเมลของคุณแล้ว
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-4">รายละเอียดการจอง</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">วิลล่า</p>
                    <p className="font-semibold">{bookingData.villa.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">วันที่</p>
                    <p className="font-semibold">
                      {bookingData.checkIn} ถึง {bookingData.checkOut} ({calculateNights()} คืน)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">ผู้เข้าพัก</p>
                    <p className="font-semibold">{bookingData.guests} คน</p>
                  </div>
                  <div>
                    <p className="text-gray-600">หมายเลขอ้างอิง</p>
                    <p className="font-semibold">HH{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/villas" 
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  ดูวิลล่าอื่น ๆ
                </Link>
                <Link 
                  to="/" 
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
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