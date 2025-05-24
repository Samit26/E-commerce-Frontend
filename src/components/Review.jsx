import React, { useState } from "react";
import StarRating from "./StarRating";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import config from "../../config";

const Review = ({ product }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reviews, setReviews] = useState(product?.rating?.reviews || []);

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!userRating || !reviewText.trim()) return;
    setSubmitting(true);
    try {
      // Replace with your backend API endpoint for submitting a review
      await axios.post(
        `${config.backendUrl}/api/products/review/${product._id}`,
        {
          rating: userRating,
          comment: reviewText,
          user:
            JSON.parse(localStorage.getItem("user"))?.user?.name || "Anonymous",
        }
      );
      setReviews([
        ...reviews,
        {
          user:
            JSON.parse(localStorage.getItem("user"))?.user?.name || "Anonymous",
          rating: userRating,
          comment: reviewText,
        },
      ]);
      setUserRating(0);
      setReviewText("");
    } catch (error) {
      // Optionally show error
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {product ? (
        <div className="border-t-2 pt-8 w-full flex flex-col md:flex-row justify-center items-start gap-4 my-5">
          {/* Rate this Product */}
          <div className="w-full md:w-1/3 border rounded-xl border-blue-200 bg-gradient-to-br from-purple-50 to-blue-100 shadow-lg p-5 flex flex-col items-start justify-center mt-6">
            <h1 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-purple-500 rounded-full mr-2"></span>
              Rate this Product
            </h1>
            <div className="flex gap-2 mb-4 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl transition-colors duration-200 ${
                    userRating >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                  title={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </span>
              ))}
              {userRating > 0 && (
                <span className="ml-2 text-blue-600 font-semibold text-lg">
                  {userRating} / 5
                </span>
              )}
            </div>
            <textarea
              className="w-full rounded-lg border border-purple-200 bg-white p-3 mt-2 text-gray-700 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-shadow shadow-inner min-h-[70px]"
              placeholder="Write about our product..."
              value={reviewText}
              onChange={handleReviewChange}
              rows="3"
              cols="30"
            ></textarea>
            <button
              className="my-3 place-self-center px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold border-none shadow-md hover:from-purple-500 hover:to-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={submitting || !userRating || !reviewText.trim()}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:w-2/3 border rounded-xl border-blue-200 bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg p-5 flex flex-col items-start justify-center mt-6">
            <h1 className="font-bold text-2xl mb-6 text-blue-700 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
              Reviews
            </h1>
            {reviews.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center py-8">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486790.png"
                  alt="No reviews"
                  className="w-16 h-16 mb-2 opacity-60"
                />
                <p className="text-gray-500 text-lg font-medium">
                  No reviews available
                </p>
              </div>
            ) : (
              <div className="w-full space-y-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex items-start gap-4 bg-white rounded-xl shadow border border-blue-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <FaRegUserCircle className="text-4xl text-blue-400 mb-1" />
                      <span className="text-xs text-gray-400">
                        {review.user}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 text-sm text-blue-600 font-semibold">
                          {review.rating} / 5
                        </span>
                      </div>
                      <div className="text-gray-700 text-base bg-blue-50 rounded-lg p-3 shadow-inner">
                        {review.comment}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Review;
