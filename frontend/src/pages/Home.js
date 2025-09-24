// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import FeaturedVillas from '../components/FeaturedVillas';
import Features from '../components/Features';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedVillas />
      <Features />
      <CTA />
    </div>
  );
};

export default Home;