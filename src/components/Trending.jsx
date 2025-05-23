import { useState, useEffect, useRef, useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { FaChevronRight, FaRegHeart, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import config from "../../config";
import axios from "axios";
import CartContext from "../context/Cart/CartContext";

export default function Trending() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trending, setTrending] = useState([]);
  const timerRef = useRef(null); // Stores timer reference without triggering re-renders
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/api/products/trending`
        );
        setTrending(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  // Auto-slide using `useRef()` instead of state dependency
  useEffect(() => {
    if (!trending.length) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
    }, 7000); // Set auto-slide every 7 seconds

    return () => clearInterval(timerRef.current); // Cleanup timer
  }, [trending]); // Only runs once when trending loads

  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === -1 && prevIndex === 0) return prevIndex; // Prevent loop back
      return (prevIndex + direction) % trending.length;
    });

    // Reset timer on user interaction without re-rendering the component
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
    }, 7000); // Restart auto-slide timer after manual click
  };

  return (
    <section
      id="trending"
      className="relative w-full max-w-7xl mx-auto mt-8 pt-10 md:mt-10 px-10 md:px-16 bg-[#f8f8f8]"
    >
      {/* Carousel Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Carousel Items */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {trending.map((product, index) => (
            <div key={product._id} className="flex-shrink-0 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-10">
                {/* Image Section */}
                <div className="image flex items-center justify-center w-full md:w-[40%]">
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="h-[300px] w-[300px] md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px] border border-black rounded-lg object-cover bg-center transform scale-90 transition-transform duration-300 hover:scale-95"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </Link>
                </div>

                {/* Text Section */}
                <div className="description p-5 flex flex-col items-start justify-center w-full md:w-[60%] gap-4 md:gap-6">
                  <div className="text-gray-600 text-lg md:text-xl font-medium">
                    TRENDING NOW
                  </div>
                  <Link
                    to={`/product/${product._id}`}
                    className="text-2xl md:text-3xl p-1 line-clamp-2 font-bold"
                  >
                    {product.name}
                  </Link>
                  <div className="text-lg md:text-base text-gray-600 line-clamp-3">
                    {product.description}
                  </div>
                  <div className="flex items-center text-xl md:text-base gap-4">
                    {product.sales === product.stock ? (
                      <span className="text-red-500 font-bold text-lg">
                        Out of Stock
                      </span>
                    ) : (
                      <>
                        <button className="bg-blue-500 flex items-center justify-center text-base h-10 text-white px-4 py-2 rounded-md">
                          Buy Now
                        </button>
                        <button
                          className="border border-blue-500 flex items-center justify-center text-base h-10 w-10 text-blue-500 p-2 rounded-md"
                          onClick={() => handleAddToCart(product)}
                        >
                          <MdAddShoppingCart />
                        </button>
                      </>
                    )}
                    <button className="ml-5 text-2xl md:text-2xl text-red-600">
                      <FaRegHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left Navigation */}
      <div className="absolute flex items-center justify-center h-full top-1/2 left-2 md:left-4 transform -translate-y-1/2 cursor-pointer z-10 bg-transparent">
        <FaChevronLeft
          onClick={() => handleNavigation(-1)}
          className="text-2xl md:text-3xl text-gray-700 hover:text-black"
        />
      </div>

      {/* Right Navigation */}
      <div className="absolute flex items-center justify-center h-full top-1/2 right-2 md:right-4 transform -translate-y-1/2 cursor-pointer z-10 bg-transparent">
        <FaChevronRight
          onClick={() => handleNavigation(1)}
          className="text-2xl md:text-3xl text-gray-700 hover:text-black"
        />
      </div>
    </section>
  );
}
