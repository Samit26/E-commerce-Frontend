import React, { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import CartContext from "../context/Cart/CartContext";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { StarRating } from "../components";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { products, searchQuery, loading } = useContext(ProductContext); // Access loading from context
  const { handleAddToCart } = useContext(CartContext); // Import add to cart handler
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    if (!loading && location.pathname === "/search" && products?.length === 0) {
      setTimeout(() => {
        navigate("/"); // Redirect to home page after 3 seconds
      }, 3000);
    }
  }, [location.pathname, products, searchQuery, loading, navigate]); // Run effect when route/products change

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-3 md:px-8">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-10 border border-blue-100">
        <h2 className="text-2xl font-extrabold mb-8 text-center text-blue-700 tracking-wide">
          Search Results
        </h2>
        {loading ? (
          // Loading Spinner
          <div className="w-full h-[200px] flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              alt="No Results"
              className="w-24 h-24 mb-4 opacity-70"
            />
            <p className="text-center text-gray-500 text-lg font-medium">
              No products found. Redirecting to home page...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-blue-50 w-full h-auto p-6 rounded-xl shadow-lg flex flex-col items-center justify-start border border-blue-100 hover:shadow-2xl transition-shadow"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product._id}`}
                  className="w-full h-[220px] md:h-[260px] lg:h-[260px] rounded-xl mb-4 bg-center overflow-hidden"
                >
                  <img
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                    src={product.images[0]}
                    alt={product.name}
                  />
                </Link>

                {/* Product Name */}
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg md:text-xl w-full font-bold line-clamp-1 text-center text-blue-800 hover:underline"
                >
                  {product.name}
                </Link>

                {/* Product Description */}
                <p className="text-gray-600 w-full text-sm md:text-base line-clamp-2 text-center mt-2">
                  {product.description}
                </p>

                {/* Product Price */}
                <Link
                  to={`/product/${product._id}`}
                  className="flex items-center justify-center text-green-600 w-full font-bold mt-4 text-lg"
                >
                  ₹ {product.price}
                </Link>

                {/* Product Rating */}
                <div className="mt-4 w-full flex items-center justify-between">
                  <StarRating rating={product.rating.average} />
                  <div className="flex flex-col justify-center items-end">
                    <span className="text-xs text-gray-500">
                      {product.rating.average}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.rating.ratingCount})
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full flex items-center justify-between gap-4 mt-4">
                  {product.sales === product.stock ? (
                    <span className="text-red-500 font-bold text-sm text-center w-full">
                      Out of Stock
                    </span>
                  ) : (
                    <>
                      <button className="bg-blue-500 flex items-center justify-center text-sm h-10 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-colors">
                        Buy Now
                      </button>
                      <button
                        className="border border-blue-500 flex items-center justify-center text-sm h-10 w-10 text-blue-500 p-2 rounded-md hover:bg-blue-100 transition-colors"
                        onClick={() => handleAddToCart(product)}
                      >
                        <MdAddShoppingCart />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
