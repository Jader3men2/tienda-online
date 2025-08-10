// src/pages/Carrito.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../estilos/carrito.css";

const Carrito = () => {
  const { cart, clearCart, decreaseQuantity } = useCart();

  // funcion para calcular el total
  const total = cart.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.quanty,
    0
  );
  return (
    <div>
      <h2 className="titulo-carrito">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={`${item._id || item._id}-${item.talla || ""}-${index}`}
            className="container-car"
          >
            <img
              src={`http://localhost:3000${item.imagenUrl}`}
              alt={item.nombre}
            />
            <h3>{item.nombre}</h3>
            <p>Precio: ${item.precio}</p>
            <p>Talla:{item.talla}</p>
            <p>Cantidad: {item.quanty}</p>
            <button onClick={() => decreaseQuantity(item._id, item.talla)}>
              <FaTrash />
            </button>
          </div>
        ))
      )}
      <h3 className="total-car">TOTAL: ${total.toFixed(2)}</h3>
      <button onClick={clearCart} className="boton-vaciar">
        Vaciar Carrito
      </button>
      <Link to="/checkout" className="fin_compra">
        Finalizar compra
      </Link>
    </div>
  );
};

export default Carrito;
