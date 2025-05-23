import React, { useContext } from 'react'
import ProductContext from '../context/Product/ProductContext';
import { Link } from 'react-router-dom';
import { StarRating } from '../components';
import { MdAddShoppingCart } from 'react-icons/md';

const WishlistPage = () => {
  const { popularProducts } = useContext(ProductContext);
  const wishlistProducts = popularProducts;
  // const wishlistProducts = [];

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 pt-10 md:mt-10 px-6 md:px-10 bg-[#f8f8f8] py-4 rounded-lg mb-8">
      <h2 className="text-black text-xl font-semibold mb-4 text-center">Wishlist Products</h2>
      {wishlistProducts.length === 0 ? (
        <p className="text-center text-gray-500">No Products Added.</p>
      ) : (
        <div className="max-h-max w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product._id} className="bg-white w-full h-max bg-center p-4 rounded-lg shadow flex flex-col items-center justify-center">
              {/* Product Image */}
              <Link to={`/product/${product._id}`} className="w-full h-[200px] rounded-xl mb-4 bg-center">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>

              {/* Product Name */}
              <Link to={`/product/${product._id}`} className="text-lg w-full font-semibold line-clamp-1">
                {product.name}
              </Link>

              {/* Product Description */}
              <p className="text-gray-600 w-full text-xs line-clamp-2">{product.description}</p>

              {/* Product Price */}
              <Link to={`/product/${product._id}`} className="flex items-center justify-start text-blue-600 w-full font-bold mt-2">
                ₹ {product.price}
              </Link>

              {/* Product Rating */}
              <div className="mt-2 w-full flex items-center justify-evenly">
                <StarRating rating={product.rating.average} />
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="text-xs text-gray-500">{product.rating.average}</span>
                  <span className="text-xs text-gray-500">({product.rating.ratingCount})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full h-auto flex items-center justify-center gap-2 mt-4">
                {product.sales === product.stock ? (
                  <span className="text-red-500 font-bold text-base">Out of Stock</span>
                ) : (
                  <>
                    <button className="bg-blue-500 flex items-center justify-center text-sm h-full text-white p-2 rounded-md">
                      Buy Now
                    </button>
                    <button className="border border-blue-500 flex items-center justify-center text-sm h-full text-blue-500 p-2 rounded-md">
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
  )
}

export default WishlistPage
