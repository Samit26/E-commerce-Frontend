import React from "react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-8 w-full min-h-[200px]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <div className="flex flex-col justify-center text-center items-center ">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-400">
              Your one-stop shop for all kinds of products. Quality & variety, all in one place.
            </p>
          </div>
          <div className="flex flex-col justify-center text-center items-center ">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400">Email: support@store.com</p>
            <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
          </div>
          <div className="flex flex-col justify-center text-center items-center ">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to='/addProduct' className="text-gray-400 hover:text-white">Join us</Link></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-400 text-xl hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 text-xl hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 text-xl hover:text-white">
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
        </div>
      </footer>
    </>

  );
};

export default Footer;