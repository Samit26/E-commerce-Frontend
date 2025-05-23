import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop", description: "High-performance laptop for all your needs.", price: "$1200", image: "https://5.imimg.com/data5/SELLER/Default/2021/12/LZ/HI/BA/107901374/photo-1491472253230-a044054ca35f-apple-jpg-1000x1000.jpg" },
  { id: 2, name: "iPhone", description: "Latest iPhone with advanced features.", price: "$999", image: "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605258" },
  { id: 3, name: "Earbuds", description: "Wireless earbuds with noise cancellation.", price: "$150", image: "https://m.media-amazon.com/images/I/61MEqB9MfML.jpg" },
  { id: 4, name: "TV", description: "Smart TV with 4K resolution.", price: "$800", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYfBip5TRXWQzE1viFYAgtFD7HqvzCd8go2A&s" },
  { id: 5, name: "Watch", description: "Stylish smartwatch with fitness tracking.", price: "$200", image: "https://m.media-amazon.com/images/I/61IduqXygwL._AC_UY350_.jpg" },
];

const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <section className="flex flex-col md:flex-row gap-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black md:px-24 md:py-20 p-8 w-full rounded-3xl shadow-2xl border border-gray-700">
      <div className="p-12 flex-1 flex flex-col gap-6 text-white" id="description">
        <h2 className="text-yellow-400 text-sm md:text-lg uppercase tracking-wider">New Arrivals</h2>
        <div className="flex flex-col gap-6">
          <Link className="text-4xl">
            <h1 className="md:text-5xl text-2xl font-bold">{products[currentIndex].name}</h1>
          </Link>
          <p className="text-gray-400 text-base max-w-lg">{products[currentIndex].description}</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-yellow-500 text-black text-lg px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition-all">Add to Cart</button>
          <button className="border border-yellow-500 text-yellow-500 text-lg px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-all">More Details</button>
        </div>
      </div>

      <div className="flex justify-center items-center w-[40%] relative">
        <img className="h-[80%] md:h-[25rem] rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 border border-yellow-500" src={products[currentIndex].image} alt={products[currentIndex].name} />
      </div>
    </section>
  );
};

export default Trending;