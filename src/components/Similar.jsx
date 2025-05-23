import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { MdAddShoppingCart } from 'react-icons/md';
import ProductContext from '../context/Product/ProductContext';

const Similar = () => {
  const { popularProducts } = useContext(ProductContext)

  return (
    <div className="w-full border-t-2 pt-8 pb-6 px-6 rounded-lg mb-8 max-w-screen-xl mx-auto">
      <h2 className="text-black text-xl font-semibold mb-4 text-center">Products You May Like</h2>
      {popularProducts.length === 0 ? (
        <p className="text-center text-gray-500">No Similar Products available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3  lg:grid-cols-5">
          {popularProducts.map((product) => (
            <div key={product._id} className="bg-white w-full h-auto p-4 rounded-lg shadow flex flex-col items-center justify-center">
              <Link to={`/product/${product._id}`} className="w-full h-[200px] rounded-xl mb-4 bg-center">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>
              <Link to={`/product/${product._id}`} className="text-lg w-full font-semibold line-clamp-1">
                {product.name}
              </Link>
              <p className="text-gray-600 w-full text-xs line-clamp-2">{product.description}</p>
              <Link to={`/product/${product._id}`} className="flex items-center justify-start text-blue-600 w-full font-bold mt-2">
                ₹ {product.price}
              </Link>
              <div className="mt-2 w-full flex items-center justify-evenly">
                <StarRating rating={product.rating.average} />
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="text-xs text-gray-500">{product.rating.average}</span>
                  <span className="text-xs text-gray-500">({product.rating.ratingCount})</span>
                </div>
              </div>
              <div className="w-full h-auto flex items-center justify-center gap-2 mt-4">
                {product.sales == product.stock ? (
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
    </div >
  )
}

export default Similar