// frontend/src/components/Map.js
import React from 'react';

const Map = ({ lat, lng, name }) => {
  const mapUrl = `https://www.google.com/maps/place/HomeHug+PoolVilla+Pattaya/@12.8791807,100.9058358,18.5z/data=!4m6!3m5!1s0x3102950059d21839:0xd2dd6485e54246cf!8m2!3d12.8791403!4d100.9068885!16s%2Fg%2F11lw0ljt9c?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D`;

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