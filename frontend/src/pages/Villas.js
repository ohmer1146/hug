import React, { useState, useEffect } from 'react';
import VillaCard from '../components/VillaCard';

const Villas = () => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch('/api/villas');
        const data = await response.json();
        setVillas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching villas:', error);
        setLoading(false);
      }
    };

    fetchVillas();
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Villas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {villas.map(villa => (
          <VillaCard key={villa._id} villa={villa} />
        ))}
      </div>
    </div>
  );
};

export default Villas;