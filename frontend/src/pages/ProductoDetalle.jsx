import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import TallasSelector from "../components/TallasSelector";

function ProductoDetalle() {
  const [producto, setProducto] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/productos/${id}`);

          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }

          const data = await res.json();
          setProducto(data);
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      };
      fetchProducto();
    }
  }, [id]); //el efecto se ejecuta cuando cambie el id de la url

  const handleAddToCart = () => {
    if (tallaSeleccionada) {
      const productoParaCarrito = {
        ...producto,
        talla: tallaSeleccionada,
      };
      addToCart(productoParaCarrito);
      alert(
        `${producto.nombre} agregado al carrito en talla ${tallaSeleccionada}`
      );
    } else {
      alert("por favor, selecciona una talla ");
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle_producto">
      <h2>Detalle del Producto</h2>
      <img
        src={`http://localhost:3000${producto.imagenUrl}`}
        alt="imagen producto"
      />
      <h2>{producto.nombre}</h2>
      <p>Precio:{producto.precio}</p>
      {/* -- ¡Usa tu componente TallasSelector aquí! -- */}
      {producto.tallas && producto.tallas.length > 0 && (
        <TallasSelector
          tallas={producto.tallas}
          tallaSeleccionada={tallaSeleccionada}
          setTallaSeleccionada={setTallaSeleccionada}
        />
      )}
      <p>Descripcion:{producto.descripcion}</p>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
}

export default ProductoDetalle;
