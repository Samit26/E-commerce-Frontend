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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-3 md:px-8 mt-8">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-6 md:p-10 space-y-10 border border-blue-100">
        {isLoading ? (
          // Loader Section
          <div className="w-full h-[200px] flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Product product={product} />
            </div>
            <div className="mb-8">
              <Review product={product} />
            </div>
            <div>
              <Similar product={product} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
