/* eslint-disable react/prop-types */
import {useState, useContext, createContext} from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Implement functions to add, remove, and manage cart items
  const value = {
    cartItems,
    setCartItems,
    addToCart: (book) => {
        setCartItems((prev) => [...prev, book]);
    },    
    removeFromCart: (bookId) => {
      // Implement logic to remove a book from the cart
      setCartItems(prev => prev.filter(book => book.id !== bookId))
    },
    // Add other cart-related functions as needed
    isBookInCart: (bookId) => {
      return cartItems.some((item) => item.id === bookId);
    }
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider };
