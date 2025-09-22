import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/ImageUpload';

const AdminVillas = () => {
  const [villas, setVillas] = useState([]);
  const [editingVilla, setEditingVilla] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    bedrooms: '',
    bathrooms: '',
    capacity: '',
    description: '',
    amenities: [],
    images: []
  });

  // ฟังก์ชันเมื่อรูปภาพเปลี่ยนแปลง
  const handleImagesChange = (images) => {
    setFormData({ ...formData, images });
  };

  // ฟังก์ชันส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://homehuggroup.onrender.com/api/villas', {
        method: editingVilla ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // หากมีการแก้ไข ให้ส่ง ID ไปด้วย
          ...(editingVilla && { id: editingVilla._id })
        }),
      });
      
      if (response.ok) {
        // รีเซ็ตฟอร์มและโหลดข้อมูลใหม่
        setFormData({
          name: '',
          location: '',
          pricePerNight: '',
          bedrooms: '',
          bathrooms: '',
          capacity: '',
          description: '',
          amenities: [],
          images: []
        });
        setEditingVilla(null);
        fetchVillas();
      }
    } catch (error) {
      console.error('Error saving villa:', error);
    }
  };

  return (
    <div className="admin-content-section">
      <h2 className="admin-section-title">
        {editingVilla ? 'แก้ไขวิลล่า' : 'เพิ่มวิลล่าใหม่'}
      </h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-form-label">ชื่อวิลล่า</label>
          <input
            type="text"
            className="admin-form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-form-label">ที่ตั้ง</label>
          <input
            type="text"
            className="admin-form-input"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-form-label">ราคาต่อคืน</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-form-label">จำนวนห้องนอน</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-form-label">จำนวนห้องน้ำ</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group">
          <label className="admin-form-label">ความจุผู้เข้าพัก</label>
          <input
            type="number"
            className="admin-form-input"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            required
          />
        </div>
        
        <div className="admin-form-group admin-form-full">
          <label className="admin-form-label">คำอธิบาย</label>
          <textarea
            className="admin-form-textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
          />
        </div>
        
        <div className="admin-form-group admin-form-full">
          <label className="admin-form-label">สิ่งอำนวยความสะดวก (คั่นด้วยเครื่องหมายจุลภาค)</label>
          <input
            type="text"
            className="admin-form-input"
            value={formData.amenities.join(', ')}
            onChange={(e) => setFormData({ 
              ...formData, 
              amenities: e.target.value.split(',').map(item => item.trim()).filter(item => item) 
            })}
          />
        </div>
        
       <div className="admin-form-group admin-form-full">
  <label className="admin-form-label">รูปภาพวิลล่า</label>
  <ImageUpload 
    onImagesChange={handleImagesChange}
    existingImages={formData.images}
          />
        </div>
        
        <div className="admin-form-group admin-form-full">
          <button type="submit" className="admin-form-button">
            {editingVilla ? 'อัพเดทวิลล่า' : 'เพิ่มวิลล่า'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminVillas;