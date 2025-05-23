import React, { useEffect, useState } from "react";
import { toast, Bounce, Zoom } from "react-toastify";
import ProductContext from "./ProductContext.js";
import config from "../../../config.js";
import axios from "axios";

const ProductContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async (e, navigate) => {
    e.preventDefault();
    setLoading(true);
    if (searchQuery.length < 4) {
      setLoading(false);
      toast.info("More than 3 letters required", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true); // Start loading during search
      const response = await fetch(
        `${config.backendUrl}/api/products/search?query=${searchQuery}`
      );
      const data = await response.json();

      if (data.products.length === 0) {
        setProducts([]);
        toast("No products found! ", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/"); // Redirect immediately after showing toast
        }, 4000);
      } else {
        setProducts(data.products);
        navigate("/search");
      }
      setSearchQuery(""); // Clear search query after submission
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const { data } = await axios.get(
          `${config.backendUrl}/api/products/popular`
        );
        setPopularProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        handleSearch,
        searchQuery,
        setSearchQuery,
        products,
        popularProducts,
        loading, // Expose loading state
        setLoading, // Optional: Expose setLoading if needed elsewhere
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
