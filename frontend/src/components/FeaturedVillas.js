// src/components/FeaturedVillas.js
import React from 'react';
import { Link } from 'react-router-dom';
import VillaCard from './VillaCard';

const FeaturedVillas = () => {
  // ข้อมูลตัวอย่าง - แก้ไขให้ถูกต้อง
  const featuredVillas = [
    {
      _id: "1",
      name: "Home Hug Pool Villa 1",
      location: "พัทยา, ประเทศไทย",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      capacity: 6, // เพิ่ม capacity
      description: "พูลวิลล่าสุดหรูในพัทยา พร้อมสระว่ายน้ำส่วนตัว",
      pricePerNight: 12500,
      images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1"],
      amenities: ["สระว่ายน้ำส่วนตัว", "ที่จอดรถ", "WiFi"]
    },
    {
      _id: "2",
      name: "Home Hug Pool Villa 2",
      location: "พัทยา, ประเทศไทย", 
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      capacity: 8,
      description: "วิลล่าดีไซน์โมเดิร์นพร้อมอินฟินิตี้พูล",
      pricePerNight: 18900,
      images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1"],
      amenities: ["อินฟินิตี้พูล", "สวนส่วนตัว", "ครัวพร้อม"]
    },
    {
      _id: "3", 
      name: "Home Hug Pool Villa 3",
      location: "พัทยา, ประเทศไทย",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      capacity: 4,
      description: "วิลล่าขนาดกะทัดรัดเหมาะสำหรับครอบครัว",
      pricePerNight: 9800,
      images: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/523443492.jpg?k=757744174334a476ef43be694c18c6910c0c05c7f5859db979130cce7f3060b2&o=&hp=1"],
      amenities: ["สระว่ายน้ำ", "ที่จอดรถ", "WiFi"]
    }
  ];

  return (
    <section className="section featured-villas">
      <div className="container">
        <h2 className="section-title">พูลวิลล่าแนะนำ</h2>
        <p className="section-subtitle">ค้นพบพูลวิลล่าหลักสวยในพัทยาสำหรับการพักผ่อนที่สมบูรณ์แบบ</p>
        
        <div className="villas-grid">
          {featuredVillas.map(villa => (
            <VillaCard key={villa._id} villa={villa} />
          ))}
        </div>
        
        <div className="view-all">
          <Link to="/villas" className="btn btn-primary">ดูวิลล่าทั้งหมด</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillas;