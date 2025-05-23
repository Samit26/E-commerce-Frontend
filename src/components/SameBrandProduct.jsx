// Step 1: Import necessary dependencies
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import { Link, useParams } from 'react-router-dom';
import StarRating from './StarRating';
import { MdAddShoppingCart } from 'react-icons/md';

// Step 2: Define the SameBrandProduct component
const SameBrandProduct = () => {
  const { brand } = useParams(); // Extract the brand from the route parameters
  const [products, setProducts] = useState([]); // State to hold the products
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Step 3: Fetch products based on the brand when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${config.backendUrl}/api/products/brand/${brand}`);
        setProducts(data); // Set the fetched products in the state
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Stop loading after fetching is complete
      }
    };
    fetchProducts(); // Call the fetch function
  }, [brand]); // Re-run the effect if the brand changes

  // Step 4: Return the JSX layout
  return (
    <div className="w-full max-w-screen-xl mx-auto mb-8 mt-8 pt-10 md:mt-10 px-10 md:px-16">
      {/* Step 5: Heading */}
      <h2 className="text-xl font-bold mb-6 text-center uppercase">Products by {brand}</h2>

      {/* Step 6: Conditional rendering for loading, products, or empty state */}
      {isLoading ? (
        // Loader Section
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        // Step 7: Grid container for products
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Step 8: Map through products and render each product */}
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white w-full h-auto p-4 rounded-lg shadow flex flex-col items-center justify-center"
            >
              {/* Step 9: Product image */}
              <Link to={`/product/${product._id}`} className="w-full h-[250px] md:h-[300px] lg:h-[300px] rounded-xl mb-4 bg-center">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>

              {/* Step 10: Product name */}
              <Link to={`/product/${product._id}`} className="text-lg md:text-xl w-full font-semibold line-clamp-1 text-center">
                {product.name}
              </Link>

              {/* Step 11: Product description */}
              <p className="text-gray-600 w-full text-sm md:text-base line-clamp-2 text-center mt-2">
                {product.description}
              </p>

              {/* Step 12: Product price */}
              <Link to={`/product/${product._id}`} className="flex items-center justify-center text-blue-600 w-full font-bold mt-4 text-lg">
                ₹ {product.price}
              </Link>

              {/* Step 13: Product rating */}
              <div className="mt-4 w-full flex items-center justify-center">
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

              {/* Step 14: Actions (Buy Now and Add to Cart) */}
              <div className="w-full flex items-center justify-center gap-4 mt-4">
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
      )}
    </div>
  );
};

// Step 15: Export the component
export default SameBrandProduct;