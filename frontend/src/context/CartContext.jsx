// src/context/CartContext.jsx
import React from "react";
import { createContext, useState, useContext, useEffect } from "react";

// Crea el contexto
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const decreaseQuantity = (id, talla) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item._id === id && item.talla === talla
              ? { ...item, quanty: item.quanty - 1 }
              : item
          )
          .filter((item) => item.quanty > 0) // Elimina si llega a 0
    );
  };

  //eliminar por id
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // vaciar todo el carritos
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica si el producto ya está en el carrito con la misma talla
      const existingProduct = prevCart.find(
        (item) => item._id === product._id && item.talla === product.talla
      );
      if (existingProduct) {
        // Si el producto ya está, solo incrementa la cantidad
        return prevCart.map((item) =>
          item._id === product._id && item.talla === product.talla
            ? { ...item, quanty: item.quanty + 1 }
            : item
        );
      } else {
        // Si el producto no está, lo agrega al carrito
        return [...prevCart, { ...product, quanty: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
