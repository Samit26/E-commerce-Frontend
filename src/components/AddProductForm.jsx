import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import AddProductContext from "../context/AddProduct/AddProductContext";

const AddProductForm = () => {

  const { productData, setProductData, handleChange, handleSubmit } = useContext(AddProductContext)

  return (
    <div className="flex justify-center items-center p-5">
      <ToastContainer />
      <div className="w-full lg:max-w-[80%] mx-auto bg-white p-8 border-gray-200 rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-left text-gray-700">🛍 Add New Product</h2>

        {/* 🚀 Responsive Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🚀 Basic Info Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Basic Information</h3>
            {["name", "category", "brand"].map((field) => (
              <input key={field} type="text" name={field} value={productData[field]}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                onChange={handleChange} required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
          </div>

          {/* 💰 Pricing & Stock Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Pricing & Availability</h3>
            {["price", "stock", "sales"].map((field) => (
              <input key={field} type="number" name={field} value={productData[field]}
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                onChange={handleChange} required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
              />
            ))}
          </div>

          {/* 📸 Image Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Images</h3>
            <input type="text" name="images" placeholder="Image URLs (comma-separated)"
              value={productData.images.join(",")}
              onChange={(e) => setProductData({ ...productData, images: e.target.value.split(",") })}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
            />
          </div>

          {/* 📝 Description */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Description</h3>
            <textarea name="description" value={productData.description}
              placeholder="Write a short product description..."
              onChange={handleChange} required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* ➕ Submit Button */}
          <div className="w-full flex justify-center items-center md:col-span-2">
            <button type="submit"
              className="w-full max-w-[40%] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-md hover:shadow-md transition-all">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;