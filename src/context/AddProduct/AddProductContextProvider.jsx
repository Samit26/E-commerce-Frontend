import { useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AddProductContext from './AddProductContext.js'
import config from '../../../config.js';

const AddProductContextProvider = ({ children }) => {

  const [productData, setProductData] = useState({
    name: "", price: "", description: "", category: "", brand: "", stock: "", images: [],
    sales: "", views: 0, rating: { average: 0, ratingCount: 0, reviews: [] },
    isPopular: false, isTrending: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({ ...productData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${config.backendUrl}/api/products/addProduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      runToast();
      setProductData({
        name: "", price: "", description: "", category: "", brand: "", stock: "", images: [],
        sales: "", views: 0, rating: { average: 0, ratingCount: 0, reviews: [] },
        isPopular: false, isTrending: false,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const runToast = () => toast.success("✅ Product Added Successfully!", {
    position: "top-center", autoClose: 3000, theme: "colored", transition: Bounce,
  });

  return (
    <AddProductContext.Provider value={{ productData, setProductData, handleChange, handleSubmit }}>
      {children}
    </AddProductContext.Provider>
  )
}

export default AddProductContextProvider
