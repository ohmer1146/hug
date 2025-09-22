import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './ImageUpload.css';

const ImageUpload = ({ onImagesChange, existingImages = [] }) => {
  const [images, setImages] = useState(existingImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  // ตรวจสอบว่าผู้ใช้เป็นแอดมินหรือไม่
  const isAdmin = user && user.role === 'admin';

  // ฟังก์ชันแปลงไฟล์เป็น Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // การเลือกไฟล์
  const selectFiles = async (e) => {
    if (!isAdmin) return;
    
    const files = e.target.files;
    if (files.length === 0) return;
    
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        try {
          const base64 = await fileToBase64(files[i]);
          newImages.push(base64);
        } catch (error) {
          console.error('Error converting file to base64:', error);
        }
      }
    }
    
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  // ลบรูปภาพ
  const deleteImage = (index) => {
    if (!isAdmin) return;
    
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  // การลากและวาง
  const onDragOver = (e) => {
    if (!isAdmin) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    if (!isAdmin) return;
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = async (e) => {
    if (!isAdmin) return;
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith('image/')) {
        try {
          const base64 = await fileToBase64(files[i]);
          newImages.push(base64);
        } catch (error) {
          console.error('Error converting file to base64:', error);
        }
      }
    }
    
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  // ถ้าไม่ใช่แอดมินและไม่มีรูปภาพ ให้แสดงเฉพาะรูปภาพที่มี
  if (!isAdmin && images.length === 0) {
    return null;
  }

  // ถ้าไม่ใช่แอดมิน แต่มีรูปภาพ ให้แสดงเฉพาะรูปภาพ (ไม่แสดงฟังก์ชันอัพโหลด)
  if (!isAdmin && images.length > 0) {
    return (
      <div className="image-upload-container">
        <div className="image-preview-container">
          <h3 className="preview-title">ภาพวิลล่า</h3>
          <div className="image-previews readonly">
            {images.map((image, index) => (
              <div key={index} className="image-preview readonly">
                <img 
                  src={typeof image === 'object' ? image.url : image} 
                  alt={`Preview ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // สำหรับแอดมิน: แสดงฟังก์ชันอัพโหลดครบถ้วน
  return (
    <div className="image-upload-container">
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="upload-icon">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="upload-text">คลิกหรือลากไฟล์มาวางที่นี่เพื่ออัพโหลด</p>
        <p className="upload-subtext">รองรับไฟล์ภาพ JPG, PNG, GIF (เฉพาะผู้ดูแลระบบ)</p>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          multiple
          accept="image/*"
          onChange={selectFiles}
        />
      </div>

      {images.length > 0 && (
        <div className="image-preview-container">
          <h3 className="preview-title">ภาพที่อัพโหลด</h3>
          <div className="image-previews">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img 
                  src={typeof image === 'object' ? image.url : image} 
                  alt={`Preview ${index + 1}`} 
                />
                <button
                  type="button"
                  className="delete-image-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteImage(index);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;