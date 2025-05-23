import React, { useContext } from "react";
import { Trending, Brands, Categories, Popular, ProductsContainer } from "../components";
import ProductContext from "../context/Product/ProductContext";

const HomePage = () => {
  const { loading } = useContext(ProductContext); // Access loading state from context

  return (
    <>
      {loading ? (
        // Loading Spinner
        <div className="w-full h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        // Main Content
        <>
          <Trending />
          <Brands />
          <Categories />
          <Popular />
          <ProductsContainer />
        </>
      )}
    </>
  );
};

export default HomePage;