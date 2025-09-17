// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Villas from './pages/Villas';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import VillaDetail from './pages/VillaDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/villas" element={<Villas />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/villa/:id" element={<VillaDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;