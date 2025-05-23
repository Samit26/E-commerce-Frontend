import React from 'react';
import ProductContextProvider from './Product/ProductContextProvider.jsx';
import AddProductContextProvider from './AddProduct/AddProductContextProvider.jsx';
import CartContextProvider from './Cart/CartContextProvider.jsx';

const AllContext = ({ children }) => {
  return (
    <AddProductContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          {children}
        </ProductContextProvider>
      </CartContextProvider>
    </AddProductContextProvider >
  );
};

export default AllContext;