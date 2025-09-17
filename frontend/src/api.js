// ไฟล์ง่ายๆ สำหรับเรียก API
const API_BASE = 'https://homehuggroup.onrender.com';

export const api = {
  // เรียก GET API
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    return response.json();
  },

  // เรียก POST API
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};