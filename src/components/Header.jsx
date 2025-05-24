import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaSearch,
  FaBars,
  FaRegUserCircle,
  FaTimes,
  FaRegHeart,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ProductContext from "../context/Product/ProductContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { handleSearch, searchQuery, setSearchQuery } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For toggling search box in mobile view
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling menu drawer
  const { handleOnClickCart } = useContext(ProductContext);

  const onSearch = (e) => {
    handleSearch(e, navigate);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMenuOpen(false); // Close menu when search is opened
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsSearchOpen(false); // Close search when menu is opened
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="fixed z-20 top-0 left-0 w-full bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-white/80 backdrop-blur-2xl border-b border-blue-200 shadow-lg px-4 md:px-8 flex flex-col md:flex-row items-center gap-2 md:gap-8 py-4 md:py-6 lg:py-4 transition-all">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to={`/`}>
            <div className="text-2xl font-extrabold tracking-tight text-blue-700 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer select-none px-2 py-1 rounded-lg hover:bg-blue-100/60 transition-all shadow-sm">
              Store
            </div>
          </Link>

          {/* Icons for Mobile View */}
          <div className="flex items-center gap-4 md:hidden">
            <FaSearch
              className="cursor-pointer text-xl hover:text-blue-600 transition-colors"
              onClick={toggleSearch}
            />
            <FaBars
              className="cursor-pointer text-xl hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            />
          </div>

          {/* Search Bar (Hidden in Mobile by Default) */}
          <div
            className={`bg-slate-100/80 h-10 py-1 px-2 items-center rounded-xl shadow-md w-4/5 hidden md:flex border border-blue-200 focus-within:ring-2 focus-within:ring-blue-400 transition-all`}
          >
            <form className="w-full flex items-center" onSubmit={onSearch}>
              <button
                type="submit"
                className="px-2 py-1 hover:bg-blue-100 rounded transition-all"
              >
                <FaSearch className="text-blue-700" />
              </button>
              <input
                className="bg-transparent text-black text-sm w-full px-2 py-1 border-none outline-none placeholder:text-gray-500 focus:ring-0"
                type="text"
                placeholder="Search your favourite product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Icons for Tablet/Desktop View */}
          <div className="hidden md:flex items-center gap-6">
            <Link to={`/wishlist`} className="group">
              <FaRegHeart className="cursor-pointer text-2xl font-bold text-gray-500 group-hover:text-pink-500 transition-colors drop-shadow" />
            </Link>
            <Link
              to={`/cart`}
              onClick={() => {
                handleOnClickCart();
              }}
              className="group"
            >
              <IoCartOutline className="cursor-pointer text-2xl font-bold text-gray-500 group-hover:text-blue-600 transition-colors drop-shadow" />
            </Link>
            <Link to={`/profile`} className="group">
              <FaRegUserCircle className="cursor-pointer text-2xl font-bold text-gray-500 group-hover:text-purple-600 transition-colors drop-shadow" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Box for Mobile View (Below Header, Fixed) */}
      {isSearchOpen && (
        <div className="fixed top-16 left-0 w-full bg-slate-100/90 px-4 py-2 shadow-md z-30 rounded-b-xl border-b border-blue-200 animate-fade-in flex items-center">
          <form className="w-full flex items-center" onSubmit={onSearch}>
            <button
              type="submit"
              className="px-2 py-1 hover:bg-blue-100 rounded transition-all"
            >
              <FaSearch className="text-blue-700" />
            </button>
            <input
              className="bg-transparent text-black text-sm w-full px-2 py-1 border-none outline-none placeholder:text-gray-500 focus:ring-0"
              type="text"
              placeholder="Search your favourite product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button
            className="ml-2 p-2 rounded-full hover:bg-blue-100 transition-colors text-gray-600 text-xl"
            onClick={toggleSearch}
            aria-label="Close search"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Menu Drawer for Mobile View (Below Header, Fixed) */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white/95 shadow-2xl p-4 md:hidden flex flex-col gap-4 transition-opacity duration-300 ease-in-out z-50 rounded-b-xl border-b border-blue-200 animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-blue-700">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-gray-700 hover:text-red-500 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <Link
            to={"/profile"}
            className="text-black hover:text-blue-600 font-medium transition-colors"
          >
            👤 Profile
          </Link>
          <Link
            to={"/wishlist"}
            className="text-black hover:text-pink-500 font-medium transition-colors"
          >
            ❤️ Wishlist
          </Link>
          <Link
            to={"/cart"}
            onClick={handleOnClickCart}
            className="text-black hover:text-blue-600 font-medium transition-colors"
          >
            🛒 Cart
          </Link>
          <Link
            to={"/"}
            className="text-black hover:text-green-600 font-medium transition-colors"
          >
            📞 Customer Support
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
