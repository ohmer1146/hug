import React, { useState, useEffect } from 'react';
import VillaCard from '../components/VillaCard';
import { Link } from 'react-router-dom';

const Villas = () => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredVillas, setFilteredVillas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch('https://homehuggroup.onrender.com/api/villas');
        const data = await response.json();
        setVillas(data);
        setFilteredVillas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching villas:', error);
        setLoading(false);
      }
    };

    fetchVillas();
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">วิลล่าทั้งหมด</h1>
          <p className="text-xl max-w-2xl mx-auto">
            ค้นพบวิลล่าสุดหรูสำหรับการพักผ่อนที่สมบูรณ์แบบของคุณ
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ค้นหาวิลล่า</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อหรือสถานที่..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            พบ {filteredVillas.length} วิลล่า
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">เรียงตาม:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>ราคาต่ำสุด</option>
              <option>ราคาสูงสุด</option>
              <option>ใหม่ล่าสุด</option>
            </select>
          </div>
        </div>

        {/* Villas Grid */}
        {filteredVillas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVillas.map(villa => (
              <VillaCard key={villa._id} villa={villa} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">ไม่พบวิลล่าที่ค้นหา</h3>
            <p className="text-gray-600 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหาของคุณ</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 50000]);
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">ไม่พบสิ่งที่คุณกำลังมองหา?</h2>
          <p className="mb-6">ติดต่อเราเพื่อช่วยคุณค้นหาวิลล่าที่สมบูรณ์แบบ</p>
          <Link 
            to="/contact" 
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ติดต่อเรา
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Villas;