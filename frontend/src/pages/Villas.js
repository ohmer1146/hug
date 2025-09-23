import React, { useState, useEffect } from 'react';
import VillaCard from '../components/VillaCard';
import { Link } from 'react-router-dom';
import './Villas.css';

const Villas = () => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);

useEffect(() => {
  // ข้อมูลตัวอย่างชั่วคราว
  const mockVillas = [
    {
      _id: "1",
      name: "วิลล่าคุณหนู",
      location: "พัทยา",
      pricePerNight: 2500,
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400"],
      bedrooms: 3,
      bathrooms: 2,
      capacity: 6,
      area: 120,
      available: true
    },
    {
      _id: "2", 
      name: "วิลล่าทะเลสวย",
      location: "หัวหิน",
      pricePerNight: 3500,
      images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400"],
      bedrooms: 4,
      bathrooms: 3,
      capacity: 8,
      area: 150,
      available: true
    }
  ];

  setVillas(mockVillas);
  setFilteredVillas(mockVillas);
  setLoading(false);

  // พยายามเรียก API จริง (optional)
  const fetchRealData = async () => {
    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/villas');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setVillas(data);
          setFilteredVillas(data);
        }
      }
    } catch (error) {
      console.log('ใช้ข้อมูลตัวอย่างแทน API');
    }
  };
  
  fetchRealData();
}, []);

  useEffect(() => {
    const filtered = villas.filter(villa => {
      const matchesSearch = villa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          villa.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = villa.pricePerNight >= priceRange[0] && villa.pricePerNight <= priceRange[1];
      return matchesSearch && matchesPrice;
    });
    setFilteredVillas(filtered);
  }, [searchTerm, priceRange, villas]);

 if (loading) return (
  <div className="villas-page">
    <div className="villas-container">
      <div className="loading-container">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    </div>
  </div>
);

  return (
    <div className="villas-page">
      {/* Hero Section */}
      <div className="villas-hero">
        <div className="villas-container">
          <h1 className="villas-hero-title">วิลล่าทั้งหมด</h1>
          <p className="villas-hero-subtitle">
            ค้นพบวิลล่าสุดหรูสำหรับการพักผ่อนที่สมบูรณ์แบบของคุณ
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="villas-container">
        <div className="villas-filter">
          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label">ค้นหาวิลล่า</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือสถานที่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input pl-12"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">
                ช่วงราคา: ฿{priceRange[0].toLocaleString('th-TH')} - ฿{priceRange[1].toLocaleString('th-TH')}
              </label>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="filter-results">
          <p className="results-count">
            พบ {filteredVillas.length} วิลล่า
          </p>
          <div className="results-sort">
            <span className="sort-label">เรียงตาม:</span>
            <select className="sort-select">
              <option>ราคาต่ำสุด</option>
              <option>ราคาสูงสุด</option>
              <option>ใหม่ล่าสุด</option>
            </select>
          </div>
        </div>

        {/* Villas Grid */}
        {filteredVillas.length > 0 ? (
          <div className="villas-grid">
            {filteredVillas.map(villa => (
              <VillaCard key={villa._id} villa={villa} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="no-results-title">ไม่พบวิลล่าที่ค้นหา</h3>
            <p className="no-results-text">ลองปรับเปลี่ยนเงื่อนไขการค้นหาของคุณ</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 50000]);
              }}
              className="reset-button"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="villas-container">
        <div className="villas-cta">
          <h2 className="cta-title">ไม่พบสิ่งที่คุณกำลังมองหา?</h2>
          <p className="cta-text">ติดต่อเราเพื่อช่วยคุณค้นหาวิลล่าที่สมบูรณ์แบบ</p>
          <Link to="/contact" className="cta-button">
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Villas;