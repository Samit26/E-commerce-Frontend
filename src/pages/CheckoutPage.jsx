import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../context/Cart/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, loading } = useContext(CartContext); // Access cart and loading from context
  const [total, setTotal] = useState(0); // State for total price

  // Calculate the total price whenever the cart changes
  useEffect(() => {
    const newTotal = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className='relative flex flex-col w-full max-w-7xl mx-auto my-8 pt-10 px-4 md:px-10 bg-[#f8f8f8] h-max overflow-hidden'>
      <h1 className='font-bold text-2xl mb-4 text-center'>Checkout</h1>

      {loading ? (
        // Loading spinner
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : cart.length === 0 ? (
        // Empty cart message
        <p className="text-center text-gray-600 my-5">No Products Added</p>
      ) : (
        <>
          <div className='flex flex-col lg:flex-row justify-center items-start w-full gap-5'>
            <div className='w-full lg:w-1/2 flex flex-col gap-4 border border-slate-300 rounded-md p-5'>
              <span className='font-semibold'>Shipping Address</span>
              <form className='flex flex-col gap-4'>
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="text" placeholder='Enter your name' />
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="text" placeholder='Mobile Number' />
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="email" placeholder='Email' />
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="text" placeholder='Your City' />
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="text" placeholder='Pincode' />
                <input className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' type="text" placeholder='State' />
                <textarea className='px-4 py-2 outline-none rounded-md border border-slate-300 text-sm' placeholder='Full Address'></textarea>
              </form>
            </div>

            <div className='w-full lg:w-1/2 text-sm border border-slate-300 flex flex-col p-5 rounded-md gap-4'>
              <span className='font-semibold'>Ordered Products</span>
              {cart.map((product, index) => (
                <div key={index} className='flex items-center justify-start gap-4'>
                  <img className='h-16 w-16 rounded-md object-cover' src={product.images[0]} alt={product.name} />
                  <div className='flex flex-col justify-between'>
                    <span className='line-clamp-2'>{product.name}</span>
                    <span className='text-xs text-gray-500'>₹ {product.price} x {product.quantity}</span>
                  </div>
                  <span className='ml-auto text-green-500 font-semibold'>
                    ₹ {(product.price * product.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
              <div className='mt-4 text-lg font-semibold text-center'>
                Total: ₹ {total.toFixed(2)}
              </div>
            </div>
          </div>
          <Link className='bg-blue-600 text-white place-self-center rounded-md mt-4 py-1 px-4' to={`/payment`}>
            <button>Next</button>
          </Link>
        </>
      )
      }
    </div >
  );
};

export default CheckoutPage;