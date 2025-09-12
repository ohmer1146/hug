// src/components/FeaturedVillas.js
import React from 'react';
import VillaCard from './VillaCard';

const FeaturedVillas = () => {
  // ข้อมูลตัวอย่าง - ควรดึงข้อมูลจริงจาก API
  const featuredVillas = [
    {
      id: 1,
      name: "Grand Palace Villa",
      location: "Pattaya, Thailand",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      description: "Luxury villa with private pool, stunning river views, and premium amenities for the perfect getaway.",
      price: 12500,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      name: "Ocean Breeze Villa",
      location: "Pattaya, Thailand",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      description: "Beachfront villa with infinity pool, direct beach access, and panoramic ocean views.",
      price: 18900,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      name: "Royal Sunset Villa",
      location: "Pattaya, Thailand",
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      description: "Modern villa with stunning sunset views, private pool, and luxury furnishings.",
      price: 9800,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80"
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
          <a href="#" className="btn btn-primary">View All Villas</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVillas;