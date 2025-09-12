// frontend/src/pages/VillaDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import Map from '../components/Map';

const VillaDetail = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/villas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVilla(data);
        } else {
          setError('Villa not found');
        }
      } catch (error) {
        setError('Error fetching villa details');
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{villa.name}</h1>
      <p className="text-gray-600 mb-4">{villa.location}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={villa.images[0]} alt={villa.name} className="w-full h-96 object-cover rounded-lg mb-4"/>
          <div className="grid grid-cols-3 gap-2">
            {villa.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt="" className="w-full h-32 object-cover rounded"/>
            ))}
          </div>
          
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{villa.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {villa.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <Map lat={villa.coordinates.lat} lng={villa.coordinates.lng} name={villa.name} />

          <Reviews villaId={villa._id} />
        </div>

        <div>
          <BookingForm villa={villa} onBookingSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default VillaDetail;