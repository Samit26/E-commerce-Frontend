import React, { useState } from "react";
import CartContext from "./CartContext";
import axios from "axios";
import config from "../../../config";
import { toast, Zoom } from "react-toastify";

const CartContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (user) {
      try {
        await axios.put(
          `${config.backendUrl}/api/products/userAddToCart/${product._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Item added to cart successfully!", {
          position: "top-center",
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        });
      } catch {
        toast.error("Error adding to cart. Please try again.");
      }
    } else {
      toast.error("Please login to add items to cart.", {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
    }
  };

  const handleOnClickCart = () => {
    if (cart.length > 0) return;
    const fetchProducts = async () => {
      if (user) {
        try {
          setLoading(true);

          // Fetch user cart with productId + quantity
          const { data } = await axios.get(
            `${config.backendUrl}/api/products/userCart`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          // If server returns a message (e.g., "Cart is empty")
          if (data.message) {
            setCart([]);
            return;
          }

          // Fetch all product details in parallel and merge quantity
          const productFetchPromises = data.map((item) =>
            axios
              .get(`${config.backendUrl}/api/products/get/${item.product}`)
              .then((res) => ({
                ...res.data,
                quantity: item.quantity, // attach quantity from userCart
              }))
              .catch((err) => {
                console.error(`Failed to fetch product ${item.product}:`, err);
                return null;
              })
          );

          const fetchedProducts = await Promise.all(productFetchPromises);
          const validCartItems = fetchedProducts.filter((p) => p !== null);

          setCart(validCartItems);
        } catch (error) {
          console.error("Error fetching cart products:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error("Login to view your cart", {
          position: "top-center",
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        });
        return;
      }
    };

    fetchProducts();
  };

  const handleIncrement = async (index) => {
    setCart((prevCart) =>
      prevCart.map((product, i) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrement = async (index) => {
    setCart((prevCart) =>
      prevCart.map((product, i) =>
        i === index && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleRemove = async (index) => {
    await axios.delete(
      `${config.backendUrl}/api/products/userRemoveFromCart/${cart[index]._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        cart,
        handleIncrement,
        handleDecrement,
        handleRemove,
        handleOnClickCart,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
