import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import Map from '../components/Map';

const VillaDetail = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await fetch(`https://homehuggroup.onrender.com/api/villas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVilla(data);
        } else {
          setError('ไม่พบวิลล่า');
        }
      } catch (error) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูลวิลล่า');
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12 text-center">
        <svg className="w-24 h-24 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error}</h1>
        <Link 
          to="/villas" 
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          กลับไปหน้ารายการวิลล่า
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-gray-600">
          <Link to="/" className="hover:text-purple-600">หน้าแรก</Link>
          <span className="mx-2">/</span>
          <Link to="/villas" className="hover:text-purple-600">วิลล่าทั้งหมด</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{villa.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Villa Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{villa.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <svg className="w-5 h-5 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {villa.location}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {villa.capacity} ผู้เข้าพัก
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {villa.bedrooms} ห้องนอน
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {villa.bathrooms} ห้องน้ำ
            </div>
          </div>

          <div className="text-3xl font-bold text-purple-600">
            ฿{villa.pricePerNight.toLocaleString('th-TH')} <span className="text-lg font-normal text-gray-600">/ คืน</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images and Details */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <img 
                src={villa.images[activeImage]} 
                alt={villa.name} 
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnails */}
            {villa.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mb-8">
                {villa.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${villa.name} ${index + 1}`} 
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">รายละเอียด</h2>
              <p className="text-gray-700 leading-relaxed">{villa.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">สิ่งอำนวยความสะดวก</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {villa.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            {villa.coordinates && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">ที่ตั้ง</h2>
                <Map lat={villa.coordinates.lat} lng={villa.coordinates.lng} name={villa.name} />
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <Reviews villaId={villa._id} />
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <div className="sticky top-24">
              <BookingForm villa={villa} onBookingSuccess={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VillaDetail;