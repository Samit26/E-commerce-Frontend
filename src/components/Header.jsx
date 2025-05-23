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
      <header className="fixed z-20 top-0 left-0 bg-white/60 backdrop-blur-2xl border-b w-full text-black px-4 md:px-8 flex flex-col md:flex-row items-center gap-2 md:gap-8 py-4 md:py-6 lg:py-4">
        {/* Centered Container */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to={`/`}>
            <div className="text-lg font-semibold cursor-pointer">Store</div>
          </Link>

          {/* Icons for Mobile View */}
          <div className="flex items-center gap-4 md:hidden">
            <FaSearch
              className="cursor-pointer text-xl"
              onClick={toggleSearch}
            />
            <FaBars className="cursor-pointer text-xl" onClick={toggleMenu} />
          </div>

          {/* Search Bar (Hidden in Mobile by Default) */}
          <div
            className={`bg-slate-200 h-10 py-1 px-2 items-center rounded-md shadow-sm w-4/5 hidden md:flex`}
          >
            <form className="w-full flex items-center" onSubmit={onSearch}>
              <button type="submit" className="px-2 py-1">
                <FaSearch className="text-black" />
              </button>
              <input
                className="bg-slate-200 text-black text-sm w-full px-2 py-1 border-none outline-none placeholder:text-gray-500"
                type="text"
                placeholder="Search your favourite product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Icons for Tablet/Desktop View */}
          <div className="hidden md:flex items-center gap-6">
            <Link to={`/wishlist`}>
              <FaRegHeart className="cursor-pointer text-2xl font-bold" />
            </Link>
            <Link
              to={`/cart`}
              onClick={() => {
                handleOnClickCart();
              }}
            >
              <IoCartOutline className="cursor-pointer text-2xl font-bold" />
            </Link>
            <Link to={`/profile`}>
              <FaRegUserCircle className="cursor-pointer text-2xl font-bold" />
            </Link>
          </div>
        </div>
      </header>

      {/* Search Box for Mobile View (Below Header, Fixed) */}
      {isSearchOpen && (
        <div className="fixed top-16 left-0 w-full bg-slate-200 px-4 py-2 shadow-md z-30">
          <form className="w-full flex items-center" onSubmit={onSearch}>
            <button type="submit" className="px-2 py-1">
              <FaSearch className="text-black" />
            </button>
            <input
              className="bg-slate-200 text-black text-sm w-full px-2 py-1 border-none outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Search your favourite product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}

      {/* Menu Drawer for Mobile View (Below Header, Fixed) */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md p-4 md:hidden flex flex-col gap-4 transition-opacity duration-300 ease-in-out z-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-lg text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <Link to={"/profile"} className="text-black hover:text-blue-500">
            👤 Profile
          </Link>
          {/* <Link to={"/"} className="text-black hover:text-blue-500">📦 Your Orders</Link> */}
          <Link to={"/wishlist"} className="text-black hover:text-blue-500">
            ❤️ Wishlist
          </Link>
          <Link
            to={"/cart"}
            onClick={handleOnClickCart}
            className="text-black hover:text-blue-500"
          >
            🛒 Cart
          </Link>
          <Link to={"/"} className="text-black hover:text-blue-500">
            📞 Customer Support
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
