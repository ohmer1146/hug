// frontend/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null); // ข้อมูลการจองชั่วคราว

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      fetch('https://homehuggroup.onrender.com/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          setUser(data);
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('https://homehuggroup.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };

  const register = async (userData) => {
    const response = await fetch('https://homehuggroup.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('booking_data'); // ลบข้อมูลการจองชั่วคราว
    setUser(null);
    setBookingData(null);
  };

  // ฟังก์ชันใหม่สำหรับระบบจองแบบเว็บตัวอย่าง
  const saveBookingData = (data) => {
    setBookingData(data);
    localStorage.setItem('booking_data', JSON.stringify(data));
  };

  const getBookingData = () => {
    if (bookingData) return bookingData;
    
    const savedData = localStorage.getItem('booking_data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBookingData(data);
      return data;
    }
    return null;
  };

  const clearBookingData = () => {
    setBookingData(null);
    localStorage.removeItem('booking_data');
  };

  // ฟังก์ชันจองโดยไม่ต้องล็อกอิน (สำหรับผู้ใช้ทั่วไป)
  const guestBooking = async (bookingData) => {
    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/bookings/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        // บันทึกข้อมูลการจองชั่วคราว
        saveBookingData({
          ...bookingData,
          bookingId: data._id,
          referenceNumber: data.referenceNumber
        });
        return { success: true, booking: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการจอง' };
    }
  };

  // ฟังก์ชันจองสำหรับผู้ใช้ที่ล็อกอินแล้ว
  const userBooking = async (bookingData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, message: 'กรุณาล็อกอินก่อนการจอง' };
    }

    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, booking: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการจอง' };
    }
  };

  // ฟังก์ชันดึงข้อมูลการจองของผู้ใช้
  const getUserBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return { success: false, message: 'กรุณาล็อกอิน' };

    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/bookings/my-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, bookings: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' };
    }
  };

  // ฟังก์ชันอัพเดทโปรไฟล์ผู้ใช้
  const updateProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) return { success: false, message: 'กรุณาล็อกอิน' };

    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการอัพเดทโปรไฟล์' };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    // ฟังก์ชันใหม่สำหรับระบบจอง
    guestBooking,
    userBooking,
    getUserBookings,
    updateProfile,
    saveBookingData,
    getBookingData,
    clearBookingData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};