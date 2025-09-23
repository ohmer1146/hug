// src/components/FeaturedVillas.js
import React from 'react';
import { Link } from 'react-router-dom'; // เพิ่ม import นี้
import VillaCard from './VillaCard';

const FeaturedVillas = () => {
  // ข้อมูลตัวอย่าง - ควรดึงข้อมูลจริงจาก API
  const featuredVillas = [
    {
      id: 1,
      name: "Home Hug Poolvilla",
      location: "Pattaya, Thailand",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      description: "Luxury villa with private pool, stunning river views, and premium amenities for the perfect getaway.",
      price: 4900,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523453567.jpg?k=b97f0dc98d43db8bc076acc5a06a7b6f37ce2b07996188564de4d96a16279bd5&o=&hp=1"
    },
    {
      id: 2,
      name: "Home Hug Poolvilla",
      location: "Pattaya, Thailand",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      description: "Beachfront villa with infinity pool, direct beach access, and panoramic ocean views.",
      price: 4900,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523453567.jpg?k=b97f0dc98d43db8bc076acc5a06a7b6f37ce2b07996188564de4d96a16279bd5&o=&hp=1"
    },
    {
      id: 3,
      name: "Home Hug Poolvilla",
      location: "Pattaya, Thailand",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      description: "Modern villa with stunning sunset views, private pool, and luxury furnishings.",
      price: 7900,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/523453567.jpg?k=b97f0dc98d43db8bc076acc5a06a7b6f37ce2b07996188564de4d96a16279bd5&o=&hp=1"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Featured Villas</h2>
        <p className="section-subtitle">Discover our handpicked selection of luxury pool villas for an unforgettable stay</p>
        
        <div className="villas-grid">
          {featuredVillas.map(villa => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </div>
        
        <div className="view-all">
          <Link to="/villas" className="btn btn-primary">View All Villas</Link> {/* เปลี่ยนเป็น Link */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillas;