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
      // Check if the book is already in the cart
      const isBookInCart = cartItems.some((item) => item.id === book.id);

      if (!isBookInCart) {
        // If the book is not in the cart, add it with a quantity of 1
        setCartItems((prev) => [...prev, { ...book, quantity: 1 }]);
      } else {
        // If the book is already in the cart, update its quantity
          setCartItems((prev) =>
            prev.map((item) =>
            item.id === book.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * item.price,
                }
              : item
          )
        );
      }
    },    
    removeFromCart: (bookId) => {
      // Implement logic to remove a book from the cart
      setCartItems(prev => prev.filter(book => book.id !== bookId))
    },
    // Add other cart-related functions as needed
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
