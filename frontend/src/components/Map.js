// frontend/src/components/Map.js
import React from 'react';

const Map = ({ lat, lng, name }) => {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Location</h3>
      <div className="w-full h-64">
        <iframe
          title={name}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
        />
      </div>
    </div>
  );
};

export default Map;