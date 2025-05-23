import React, { useEffect, useState } from "react";
import { Product, Review, Similar } from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const ProductPage = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!productid) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.backendUrl}/api/products/get/${productid}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchProduct();
  }, [productid]);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 mt-8">
      {isLoading ? (
        // Loader Section
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <Product product={product} />
          <Review product={product} />
          <Similar product={product} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
