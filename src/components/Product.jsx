import React, { useContext, useState } from "react";
import StarRating from "./StarRating";
import { FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import CartContext from "../context/Cart/CartContext";

const Product = ({ product }) => {
  const [image, setImage] = useState();
  const { handleAddToCart } = useContext(CartContext);

  function handleImage(image) {
    setImage(image);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto h-max overflow-hidden mt-8 pt-10 md:mt-10 md:px-16">
      {product ? (
        <div className="flex flex-col lg:flex-row h-full w-full">
          {/* Image Section */}
          <div className="lg:w-[40%] w-full h-full flex flex-col items-center">
            {/* Larger Image */}
            <div className="relative w-full lg:w-[80%] h-[350px]">
              <img
                className="h-full w-full rounded-lg object-cover bg-center transform scale-90 transition-transform duration-300 hover:scale-95"
                src={image || product.images[0]}
                alt={product.name}
              />
            </div>

            {/* Smaller Images (Always Below the Larger Image) */}
            <div className="flex mt-4 justify-center items-center gap-4">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  onClick={() => handleImage(image)}
                  key={index}
                  src={image}
                  alt=""
                  className="h-[60px] w-[60px] md:h-[70px] md:w-[70px] border border-black rounded-md object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-[60%] w-full h-full overflow-y-auto px-4 lg:px-6 lg:py-4 mt-6 lg:mt-0">
            {/* Categories/Brand */}
            <div className="mb-4 flex flex-wrap gap-2 text-sm md:text-base lg:text-sm">
              {product.category.slice(0, 2).map((category, index) => (
                <Link key={index} to={`/category/${category}`}>
                  <button className="border border-gray-400 px-4 py-1 rounded-2xl">
                    {category}
                  </button>
                </Link>
              ))}
              <Link to={`/brand/${product.brand}`}>
                <button className="border border-gray-400 px-4 py-1 rounded-2xl">
                  {product.brand}
                </button>
              </Link>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold mb-5">
              {product.name}
            </h1>

            {/* Price */}
            <div className="font-semibold text-xl md:text-2xl lg:text-xl mb-1 text-green-500">
              ₹ {product.price}
            </div>
            <div className="text-black text-base md:text-lg lg:text-base mb-2">
              MRP:{" "}
              <span className="line-through">
                ₹ {(product.price * 1.1).toFixed(2)}
              </span>
            </div>

            {/* Ratings */}
            <div className="w-full flex items-center justify-start mb-5">
              <div className="w-max">
                <StarRating rating={product.rating.average} />
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-base md:text-lg lg:text-base text-gray-700">
                  {product.rating.average}
                </span>
                <span className="text-sm md:text-base lg:text-sm text-gray-500">
                  ({product.rating.ratingCount})
                </span>
              </div>
            </div>

            {/* Purchase & Wishlist Buttons */}
            <div className="flex items-center text-base md:text-lg lg:text-base gap-4 mb-8">
              {product.sales === product.stock ? (
                <span className="text-red-500 font-bold text-lg md:text-xl lg:text-lg">
                  Out of Stock
                </span>
              ) : (
                <>
                  <button className="bg-blue-500 flex items-center justify-center h-full text-white px-4 sm:px-6 py-3 rounded-md">
                    Buy Now
                  </button>
                  <button
                    className="border border-blue-500 flex items-center justify-center text-blue-500 px-6 py-3 rounded-md"
                    onClick={() => handleAddToCart(product)}
                  >
                    <MdAddShoppingCart />
                  </button>
                </>
              )}
              <button className="ml-5 text-xl md:text-2xl lg:text-xl text-red-600">
                <FaRegHeart />
              </button>
            </div>

            {/* Description */}
            <div>
              <span className="font-bold text-lg md:text-xl lg:text-lg">
                About this Item
              </span>
              <p className="text-gray-600 text-base md:text-lg lg:text-base mt-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center w-full">Error Fetching Product</h1>
      )}
    </div>
  );
};

export default Product;
