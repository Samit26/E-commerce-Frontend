import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { MdAddShoppingCart } from "react-icons/md";
import ProductContext from "../context/Product/ProductContext";
import CartContext from "../context/Cart/CartContext";

const Similar = () => {
  const { popularProducts } = useContext(ProductContext);
  const { handleAddToCart } = useContext(CartContext);

  return (
    <div className="w-full border-t-2 pt-8 pb-6 px-2 sm:px-4 md:px-6 rounded-lg mb-8 max-w-screen-xl mx-auto bg-gradient-to-br from-blue-50 to-purple-100 shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-wide flex items-center justify-center gap-3">
        <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
        Products You May Like
        <span className="inline-block w-2 h-8 bg-purple-500 rounded-full"></span>
      </h2>
      {popularProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No Similar Products available.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-stretch w-full overflow-x-auto pb-2">
          {popularProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white flex-shrink-0 w-56 sm:w-60 h-auto p-3 sm:p-4 rounded-xl shadow-lg flex flex-col items-stretch justify-between border border-blue-100 hover:shadow-blue-200 transition-shadow group relative min-h-[340px]"
            >
              <Link
                to={`/product/${product._id}`}
                className="w-full h-32 sm:h-36 rounded-lg mb-3 bg-center overflow-hidden flex items-center justify-center"
              >
                <img
                  className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>
              <Link
                to={`/product/${product._id}`}
                className="text-sm sm:text-base w-full font-bold line-clamp-1 text-blue-800 hover:underline mb-1"
              >
                {product.name}
              </Link>
              <p className="text-gray-600 w-full text-xs line-clamp-2 mb-1 min-h-[24px]">
                {product.description}
              </p>
              <div className="flex items-baseline gap-2 text-sm sm:text-base font-bold mb-1 text-green-600 w-full">
                ₹ {product.price}
                <span className="text-gray-400 font-normal text-xs line-through">
                  ₹ {(product.price * 1.1).toFixed(0)}
                </span>
              </div>
              <div className="mt-1 w-full flex items-center justify-between">
                <StarRating rating={product.rating.average} />
                <div className="flex flex-col justify-center items-center w-auto">
                  <span className="text-xs text-blue-600 font-semibold">
                    {product.rating.average} / 5
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.rating.ratingCount})
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mt-3">
                {product.sales === product.stock ? (
                  <span className="text-red-500 font-bold text-xs">
                    Out of Stock
                  </span>
                ) : (
                  <>
                    <button
                      className="w-full sm:w-1/2 bg-blue-600 flex items-center justify-center text-xs font-semibold h-full text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 transition-colors mb-1 sm:mb-0"
                      onClick={() => handleAddToCart(product)}
                    >
                      <MdAddShoppingCart className="mr-1 text-base" /> Add to
                      Cart
                    </button>
                    <button className="w-full sm:w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-semibold h-full text-white px-2 py-1 rounded-lg shadow hover:from-blue-500 hover:to-purple-500 transition-colors">
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Similar;
