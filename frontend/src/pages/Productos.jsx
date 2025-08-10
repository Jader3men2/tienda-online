import "../estilos/Productos.css";
// src/pages/Productos.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // Importa el hook del contexto
import TallasSelector from "../components/TallasSelector";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [tallaSeleccionadas, setTallasSeleccionadas] = useState({});
  const { addToCart } = useCart(); // Usa el hook para obtener la función addToCart
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos");

        if (!res.ok) {
          const texto = await res.text();
          throw new Error(`Error del servidor: ${res.status} - ${texto}`);
        }
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  //selector de tallas

  const handleTallaChange = (id, talla) => {
    setTallasSeleccionadas((prev) => ({ ...prev, [id]: talla }));
  };

  const handleAgregar = (producto) => {
    const talla = tallaSeleccionadas[producto._id];
    if (!talla) {
      alert("selecciona una talla");
      return;
    }
    addToCart({ ...producto, talla });
  };
  if (cargando) return <p>Cargando productos...</p>;
  return (
    <div className="container-producto">
      {productos.map((producto) => (
        <div key={producto._id} className="container-detalle">
          <img
            src={`http://localhost:3000${producto.imagenUrl}`}
            alt={producto.nombre}
          />
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p>

          <TallasSelector
            tallas={producto.tallas}
            tallaSeleccionada={tallaSeleccionadas[producto._id] || ""}
            setTallaSeleccionada={(talla) =>
              handleTallaChange(producto._id, talla)
            }
          />
          <button
            className="boton-cart"
            onClick={() => handleAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Productos;
