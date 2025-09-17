// frontend/src/components/Reviews.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Reviews = ({ villaId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [villaId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://homehuggroup.onrender.com/api/reviews/villa/${villaId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://homehuggroup.onrender.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          villaId,
          rating,
          comment
        })
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment('');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value={0}>Select rating</option>
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review._id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <img
                src={review.user.avatar || '/default-avatar.png'}
                alt={review.user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-semibold">{review.user.name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;