import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbXboxX } from "react-icons/tb";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import CartContext from "../context/Cart/CartContext";

const CartPage = () => {
  const {
    loading,
    cart,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleOnClickCart,
  } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  useEffect(() => {
    // Always fetch latest cart from server on mount
    handleOnClickCart();
  }, []);

  // 1️⃣ Loading spinner
  if (loading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Consistent container for all cart states with enhanced UI
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto my-8 pt-10 md:mt-10 px-3 md:px-16 bg-gradient-to-br from-blue-50 to-purple-100 min-h-[60vh] h-max overflow-hidden">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-8 border border-blue-100">
        <h1 className="text-center font-extrabold text-3xl mb-6 text-blue-700 tracking-wide">
          YOUR CART
        </h1>
        {/* Not logged in */}
        {user === null ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <p className="text-center text-gray-500 text-lg font-medium">
              Please login to view your cart.
            </p>
          </div>
        ) : cart.length === 0 ? (
          // Empty cart
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-24 h-24 mb-4 opacity-70"
            />
            <p className="text-center text-gray-500 text-lg font-medium">
              No Products Added
            </p>
          </div>
        ) : (
          // Render the cart
          <>
            <div className="space-y-6">
              {cart.map((product, index) => (
                <div
                  key={index}
                  className="relative flex flex-col md:flex-row items-center gap-6 p-6 bg-blue-50 rounded-xl shadow border border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <TbXboxX
                    className="absolute top-2 right-2 text-2xl cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleRemove(index)}
                  />
                  <img
                    className="h-24 w-24 object-cover rounded-lg border border-blue-200 shadow-sm"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  <div className="flex-1 w-full">
                    <div className="text-xl font-bold mb-1 text-blue-800">
                      {product.name}
                    </div>
                    <div className="flex items-baseline gap-2 text-lg font-bold mb-2 text-green-600">
                      ₹ {product.price}
                      <span className="text-gray-400 font-normal text-xs line-through">
                        ₹ {(product.price * 1.1).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="bg-blue-100 hover:bg-blue-200 rounded p-1 transition-colors"
                      >
                        <CiSquareMinus className="text-2xl text-blue-600" />
                      </button>
                      <span className="text-lg font-semibold text-blue-700">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="bg-blue-100 hover:bg-blue-200 rounded p-1 transition-colors"
                      >
                        <CiSquarePlus className="text-2xl text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <Link to="/checkout">
                <button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 shadow-lg transition-colors text-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
