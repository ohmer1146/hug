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
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        console.log('🔄 กำลังโหลดข้อมูลวิลล่า...');
        const response = await fetch('https://homehuggroup.onrender.com/api/villas');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ ข้อมูลวิลล่าที่ได้รับ:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          setVillas(data);
          setFilteredVillas(data);
        } else {
          // ใช้ข้อมูลตัวอย่างหาก API ไม่มีข้อมูล
          useMockData();
        }
      } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        useMockData();
      } finally {
        setLoading(false);
      }
    };

    const useMockData = () => {
      console.log('🔄 ใช้ข้อมูลตัวอย่าง');
      const mockVillas = [
        {
          _id: "1",
          name: "วิลล่าคุณหนู",
          description: "วิลล่าสวยงามที่พัทยา",
          location: "พัทยา",
          pricePerNight: 2500,
          images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"],
          bedrooms: 3,
          bathrooms: 2,
          capacity: 6,
          amenities: ["สระว่ายน้ำ", "ที่จอดรถ", "WiFi"],
          available: true,
          featured: true,
          rating: 4.5
        },
        {
          _id: "2", 
          name: "วิลล่าทะเลสวย",
          description: "วิลล่าติดทะเลที่หัวหิน",
          location: "หัวหิน",
          pricePerNight: 3500,
          images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800"],
          bedrooms: 4,
          bathrooms: 3,
          capacity: 8,
          amenities: ["สระว่ายน้ำ", "เตาบาร์บีคิว", "ที่จอดรถ"],
          available: true,
          featured: true,
          rating: 4.8
        }
      ];
      
      setVillas(mockVillas);
      setFilteredVillas(mockVillas);
    };

    fetchVillas();
  }, []);

  useEffect(() => {
    let filtered = villas.filter(villa => {
      const matchesSearch = villa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          villa.location.toLowerCase().includes(searchTerm.toLowerCase());
      const price = villa.pricePerNight || villa.pricePerMight || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });

    // เรียงลำดับ
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.pricePerNight || a.pricePerMight || 0) - (b.pricePerNight || b.pricePerMight || 0);
        case 'price-high':
          return (b.pricePerNight || b.pricePerMight || 0) - (a.pricePerNight || a.pricePerMight || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'th');
      }
    });

    setFilteredVillas(filtered);
  }, [searchTerm, priceRange, sortBy, villas]);

  if (loading) {
    return (
      <div className="villas-page">
        <div className="villas-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>กำลังโหลดข้อมูลวิลล่า...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือสถานที่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                ช่วงราคา: ฿{priceRange[0].toLocaleString('th-TH')} - ฿{priceRange[1].toLocaleString('th-TH')}
              </label>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>
          </div>
        </div>

        {/* Results Count and Sort */}
        <div className="filter-results">
          <p className="results-count">
            พบ {filteredVillas.length} วิลล่า
          </p>
          <div className="results-sort">
            <span className="sort-label">เรียงตาม:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">ชื่อ</option>
              <option value="price-low">ราคาต่ำสุด</option>
              <option value="price-high">ราคาสูงสุด</option>
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
            <div className="no-results-icon">😔</div>
            <h3 className="no-results-title">ไม่พบวิลล่าที่ค้นหา</h3>
            <p className="no-results-text">ลองปรับเปลี่ยนเงื่อนไขการค้นหาของคุณ</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 50000]);
                setSortBy('name');
              }}
              className="btn btn-primary"
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