import React, { useContext, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { StarRating } from "../components";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { products, searchQuery, loading } = useContext(ProductContext); // Access loading from context
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
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 pt-10 mb-8">
      <h2 className="text-xl font-bold mb-6 text-center">Search Results</h2>
      {loading ? (
        // Loading Spinner
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">
          No products found. Redirecting to home page...
        </p>
      ) : (
        <div className="grid gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white w-full h-auto p-6 rounded-lg shadow flex flex-col items-center justify-start"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product._id}`}
                  className="w-full h-[250px] md:h-[300px] lg:h-[300px] rounded-xl mb-4 bg-center"
                >
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={product.images[0]}
                    alt={product.name}
                  />
                </Link>

                {/* Product Name */}
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg md:text-xl w-full font-semibold line-clamp-1 text-center"
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
                  className="flex items-center justify-center text-blue-600 w-full font-bold mt-4 text-lg"
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
                      <button className="bg-blue-500 flex items-center justify-center text-sm h-10 text-white px-4 py-2 rounded-md">
                        Buy Now
                      </button>
                      <button className="border border-blue-500 flex items-center justify-center text-sm h-10 w-10 text-blue-500 p-2 rounded-md">
                        <MdAddShoppingCart />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
