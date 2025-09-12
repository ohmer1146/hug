// frontend/src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'text-amber-400 font-medium' : 'text-white hover:text-amber-400';
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-900/95 backdrop-blur-sm py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2 text-amber-400">🏖️</span>
              HOME HUG PoolVilla
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>Home</Link>
              <Link to="/villas" className={`${isActive('/villas')} transition-colors duration-200`}>Villas</Link>
              <Link to="/gallery" className={`${isActive('/gallery')} transition-colors duration-200`}>Gallery</Link>
              <Link to="/about" className={`${isActive('/about')} transition-colors duration-200`}>About</Link>
              <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200`}>Contact</Link>
              
              <div className="flex items-center space-x-4">
                <a href="tel:+66123456789" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
                  <Phone size={16} className="mr-2" />
                  Book Now
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-80 bg-gray-900 z-50 shadow-2xl md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-xl font-bold text-white flex items-center">
                  <span className="mr-2 text-amber-400">🏖️</span>
                  BaanPakPoolVilla
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col space-y-6">
                <Link to="/" className="text-white text-lg font-medium py-2 border-b border-gray-700">Home</Link>
                <Link to="/villas" className="text-white text-lg font-medium py-2 border-b border-gray-700">Villas</Link>
                <Link to="/gallery" className="text-white text-lg font-medium py-2 border-b border-gray-700">Gallery</Link>
                <Link to="/about" className="text-white text-lg font-medium py-2 border-b border-gray-700">About</Link>
                <Link to="/contact" className="text-white text-lg font-medium py-2 border-b border-gray-700">Contact</Link>
                
                <a href="tel:+66123456789" className="bg-amber-500 text-white px-4 py-3 rounded-lg font-medium text-center mt-4 flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  Call to Book
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 mb-4">Follow us on</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-amber-400 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-amber-400 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.7 13.679 3.7 12.316s.498-2.579 1.426-3.375c.875-.856 2.026-1.346 3.323-1.346s2.448.49 3.323 1.346c.928.796 1.426 2.012 1.426 3.375s-.498 2.579-1.426 3.375c-.875.807-2.026 1.297-3.323 1.297zm8.062-5.234c0 .652-.104 1.283-.313 1.883a5.346 5.346 0 01-.885 1.619 5.28 5.28 0 01-1.357 1.153 5.218 5.218 0 01-1.749.693 5.966 5.966 0 01-2.051.104 5.767 5.767 0 01-1.92-.573 5.428 5.428 0 01-1.619-1.297 5.28 5.28 0 01-1.044-1.749 5.137 5.137 0 01-.365-1.949c0-.652.104-1.283.313-1.883.208-.599.495-1.129.885-1.619a5.28 5.28 0 011.357-1.153 5.218 5.218 0 011.749-.693 5.966 5.966 0 012.051-.104c.677.104 1.326.313 1.92.573.599.26 1.129.599 1.619 1.044.49.416.885.937 1.153 1.513.26.599.417 1.245.417 1.92z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-amber-400 transition-colors">
                    <span className="sr-only">Line</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 3.309c-1.03-1.03-2.74-1.03-3.77 0-.83.83-1.03 2.06-.56 3.06.47 1 1.47 1.65 2.57 1.65.36 0 .72-.09 1.05-.28.33-.19.6-.46.79-.79.19-.33.28-.69.28-1.05 0-1.1-.65-2.1-1.65-2.57-1-.47-2.23-.27-3.06.56-1.03 1.03-1.03 2.74 0 3.77 1.03 1.03 2.74 1.03 3.77 0 1.03-1.03 1.03-2.74 0-3.77zm-15.3 15.3c-1.03-1.03-1.03-2.74 0-3.77 1.03-1.03 2.74-1.03 3.77 0 .83.83 1.03 2.06.56 3.06-.47 1-1.47 1.65-2.57 1.65-.36 0-.72-.09-1.05-.28-.33-.19-.6-.46-.79-.79-.19-.33-.28-.69-.28-1.05 0-1.1.65-2.1 1.65-2.57 1-.47 2.23-.27 3.06.56 1.03 1.03 1.03 2.74 0 3.77-1.03 1.03-2.74 1.03-3.77 0zm15.3-15.3c1.03 1.03 1.03 2.74 0 3.77-1.03 1.03-2.74 1.03-3.77 0-1.03-1.03-1.03-2.74 0-3.77 1.03-1.03 2.74-1.03 3.77 0zm-15.3 15.3c1.03 1.03 2.74 1.03 3.77 0 1.03-1.03 1.03-2.74 0-3.77-1.03-1.03-2.74-1.03-3.77 0-1.03 1.03-1.03 2.74 0 3.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-40"
        whileHover={{ scale: 1.1 }}
      >
        <a 
          href="https://line.me/ti/p/~baanpakpoolvilla" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <MessageCircle size={24} />
        </a>
      </motion.div>
    </>
  );
};

export default Navbar;