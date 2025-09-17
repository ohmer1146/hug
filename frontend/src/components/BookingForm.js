// frontend/src/components/BookingForm.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ villa, onBookingSuccess }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * villa.pricePerNight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('Please login to book a villa');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          villaId: villa._id,
          checkIn,
          checkOut,
          guests,
          specialRequests
        })
      });

      const data = await response.json();

      if (response.ok) {
        onBookingSuccess(data);
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book This Villa</h3>
      <p className="text-2xl font-bold text-blue-600 mb-4">฿{villa.pricePerNight.toLocaleString()} <span className="text-sm font-normal text-gray-600">per night</span></p>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {Array.from({ length: villa.capacity }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Any special requests or requirements..."
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span>₿{villa.pricePerNight.toLocaleString()} x {calculateNights()} nights</span>
            <span>₿{(villa.pricePerNight * calculateNights()).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₿{calculateTotal().toLocaleString()}</span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || calculateNights() === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;