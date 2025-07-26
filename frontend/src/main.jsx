import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";
import { ImagenesProvider } from "./context/ImagenesProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImagenesProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ImagenesProvider>
  </StrictMode>
);
