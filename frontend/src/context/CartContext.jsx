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

  const decreaseQuantity = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quanty: item.quanty - 1 } : item
          )
          .filter((item) => item.quanty > 0) // Elimina si llega a 0
    );
  };

  // vaciar todo el carritos
  const ClearCart = () => setCart([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verifica si el producto ya está en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está, solo incrementa la cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quanty: item.quanty + 1 } : item
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
        ClearCart,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
