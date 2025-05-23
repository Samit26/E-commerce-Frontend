import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbXboxX } from "react-icons/tb";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import CartContext from "../context/Cart/CartContext";

const CartPage = () => {
  const { loading, cart, handleIncrement, handleDecrement, handleRemove } =
    useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { handleOnClickCart } = useContext(CartContext);
  console.log(user);
  useEffect(() => {
    handleOnClickCart();
  }, []);

  // 1️⃣ Loading spinner
  if (loading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // 2️⃣ Not logged in
  if (user === null) {
    return (
      <p className="text-center text-gray-600 my-5">
        Please login to view your cart.
      </p>
    );
  }

  // 3️⃣ Empty cart (or undefined)
  if (user && cart.length === 0) {
    return <p className="text-center text-gray-600 my-5">No Products Added</p>;
  }

  // 4️⃣ Render the cart
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto my-8 pt-10 md:mt-10 px-10 md:px-16 bg-[#f8f8f8] h-max overflow-hidden">
      <h1 className="text-center font-bold text-2xl mb-4">YOUR CART</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cart.map((product, index) => (
          <div
            key={index}
            className="relative w-full flex items-center flex-col md:flex-row gap-4 p-4 bg-white shadow rounded-md"
          >
            <TbXboxX
              className="absolute top-1 right-1 text-lg cursor-pointer text-red-600"
              onClick={() => handleRemove(index)}
            />
            <img
              className="h-20 w-20 object-cover rounded-md"
              src={product.images[0]}
              alt={product.name}
            />
            <div className="flex-1">
              <div className="text-lg md:text-xl font-bold mb-1">
                {product.name}
              </div>
              <div className="flex items-baseline gap-2 text-base font-bold mb-1 text-green-600">
                ₹ {product.price}
                <span className="text-gray-500 font-normal text-xs line-through">
                  ₹ {(product.price * 1.1).toFixed(0)}
                </span>
              </div>
              <div className="flex items-center gap-5">
                <button onClick={() => handleDecrement(index)}>
                  <CiSquareMinus className="text-2xl" />
                </button>
                <span className="text-lg">{product.quantity}</span>
                <button onClick={() => handleIncrement(index)}>
                  <CiSquarePlus className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/checkout">
        <button className="mt-4 rounded-md bg-blue-500 hover:bg-blue-600 p-2 px-4">
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartPage;
