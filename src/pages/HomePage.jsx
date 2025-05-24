import React, { useContext } from "react";
import {
  Trending,
  Brands,
  Categories,
  Popular,
  ProductsContainer,
} from "../components";
import ProductContext from "../context/Product/ProductContext";

const HomePage = () => {
  const { loading } = useContext(ProductContext); // Access loading state from context

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center">
      {loading ? (
        // Loading Spinner
        <div className="w-full h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        // Main Content
        <div className="w-full max-w-7xl mx-auto px-3 md:px-8 py-8 space-y-12">
          <div className="mb-8">
            <Trending />
          </div>
          <div className="mb-8">
            <Brands />
          </div>
          <div className="mb-8">
            <Categories />
          </div>
          <div className="mb-8">
            <Popular />
          </div>
          <div>
            <ProductsContainer />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
