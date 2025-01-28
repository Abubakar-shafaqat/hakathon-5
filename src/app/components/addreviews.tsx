import React, { useState } from 'react';

const ReviewsComponent = () => {
  // Initialize reviews with some permanent reviews and an empty new review
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent service!', date: '2025-01-25' },
    { id: 2, name: 'Jane Smith', rating: 4, comment: 'Very good, but could be better.', date: '2025-01-24' },
    { id: 3, name: 'Emily Davis', rating: 5, comment: 'Amazing experience! Highly recommend.', date: '2025-01-23' }
  ]);
  
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });

  // Handle submitting a new review
  const handleReviewSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Make sure newReview contains valid data before updating
    if (newReview.name && newReview.rating > 0 && newReview.rating <= 5 && newReview.comment) {
      // Add the new review to the reviews array
      setReviews((prevReviews) => [...prevReviews, { ...newReview, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);

      // Reset newReview state
      setNewReview({ name: '', rating: 0, comment: '' });
    } else {
      alert("Please fill in all fields with valid data.");
    }
  };

  // Handle star click to update rating
  const handleStarClick = (rating: number) => {
    if (rating >= 1 && rating <= 5) {
      setNewReview({ ...newReview, rating });
    }
  };

  return (
    <div>
      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col p-6 bg-white rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-semibold text-lg">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <p className="mt-4 text-gray-700">{review.comment}</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Review Section */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStarClick(i + 1)}
                    className={`text-2xl ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors duration-200`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-200 hover:text-black transition-colors duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsComponent;
