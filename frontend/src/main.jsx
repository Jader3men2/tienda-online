import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";
import { ImagenesProvider } from "./context/ImagenesProvider";
import { PedidoProvider } from "./context/usePedido";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImagenesProvider>
      <CartProvider>
        <PedidoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PedidoProvider>
      </CartProvider>
    </ImagenesProvider>
  </StrictMode>
);
