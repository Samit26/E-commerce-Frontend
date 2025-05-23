import React from 'react';
import StarRating from './StarRating';
import { FaRegUserCircle } from 'react-icons/fa';

const Review = ({ product }) => {
  return (
    <>
      {product ? (
        <div className="border-t-2 pt-8 w-full flex flex-col md:flex-row justify-center items-start gap-4 my-5">
          {/* Rate this Product */}
          <div className="w-full md:w-1/3 border rounded-xl border-gray-400 p-3 flex flex-col items-start justify-center">
            <h1 className="text-lg font-semibold mb-2">Rate this Product</h1>
            <StarRating rating={1} />
            <textarea
              className="w-full rounded-lg border border-gray-400 p-2 mt-2"
              placeholder="Write about our product"
              name=""
              id=""
              rows="3"
              cols="30"
            ></textarea>
            <button className="my-2 place-self-center p-2 rounded-lg bg-gray-300 min-w-40 border">
              Submit
            </button>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:w-1/3 border rounded-xl border-gray-400 p-3 flex flex-col items-start justify-center">
            <h1 className="font-bold text-xl mb-5">Reviews</h1>
            {product.rating.reviews.length === 0 ? (
              <p>No reviews available</p>
            ) : (
              product.rating.reviews.map((review, index) => (
                <div key={index} className="w-full flex justify-center items-start">
                  <div className="w-1/5 flex justify-center items-start py-2">
                    <FaRegUserCircle className="cursor-pointer text-3xl" />
                  </div>
                  <div className="w-4/5 flex flex-col mb-2">
                    <div className="w-full text-lg font-bold py-1">{review.user}</div>
                    <div className="w-full py-1">
                      <StarRating rating={review.rating} />
                    </div>
                    <div className="w-full h-max py-1">{review.comment}</div>
                  </div>
                </div>
              ))
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