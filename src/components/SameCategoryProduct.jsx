import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import { Link, useParams } from 'react-router-dom';
import StarRating from './StarRating';
import { MdAddShoppingCart } from 'react-icons/md';

const SameCategoryProduct = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${config.backendUrl}/api/products/category/${category}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Stop loading after fetching is complete
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="w-full max-w-screen-xl mx-auto mb-8 mt-8 pt-10 md:mt-10 px-10 md:px-16">
      <h2 className="text-xl font-bold mb-6 text-center uppercase">{category}</h2>
      {isLoading ? (
        // Loader Section
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white w-full h-auto p-4 rounded-lg shadow flex flex-col items-center justify-center"
            >
              <Link to={`/product/${product._id}`} className="w-full h-[250px] md:h-[300px] lg:h-[300px] rounded-xl mb-4 bg-center">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>
              <Link to={`/product/${product._id}`} className="text-lg md:text-xl w-full font-semibold line-clamp-1 text-center">
                {product.name}
              </Link>
              <p className="text-gray-600 w-full text-sm md:text-base line-clamp-2 text-center mt-2">
                {product.description}
              </p>
              <Link to={`/product/${product._id}`} className="flex items-center justify-center text-blue-600 w-full font-bold mt-4 text-lg">
                ₹ {product.price}
              </Link>
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

export default SameCategoryProduct;