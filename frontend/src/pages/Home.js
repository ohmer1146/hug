// src/pages/Home.js
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedVillas from '../components/FeaturedVillas';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <FeaturedVillas />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;