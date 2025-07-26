
import "../estilos/Productos.css"
// src/pages/Productos.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Importa el hook del contexto
import TallasSelector from "../components/TallasSelector";


const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [ tallaSeleccionadas, setTallasSeleccionadas] = useState ({});
  const { addToCart } = useCart(); // Usa el hook para obtener la función addToCart



  useEffect(() => {
    fetch("/productos.json")
    .then((response) => response.json())
    .then((data) => setProductos(data))
    .catch((error) => console.error("Error al cargar productos:", error));
    
  }, []);

  //selector de tallas

  const handleTallaChange = (id, talla) =>{
    setTallasSeleccionadas(prev => ({...prev, [id]: talla }))
  };

  const handleAgregar = (producto) =>{
    const talla = tallaSeleccionadas[producto.id];
    if (!talla){
      alert("selecciona una talla");
      return;
    }
   addToCart({ ...producto,talla});
  };

  return (
    
    <div className="container-producto">
      
      {productos.map((producto) => (
        <div key={producto.id} className="container-detalle">
          <img src={producto.img} alt={producto.nombre} />
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p> 

          <TallasSelector
          tallas={producto.tallas}
          tallaSeleccionada={tallaSeleccionadas[producto.id] || ""}
          setTallaSeleccionada={(talla) => handleTallaChange(producto.id, talla)} 
            />
            <button className="boton-cart" onClick={() => handleAgregar(producto)}>
            Agregar al carrito 
          </button>

          
        </div>
      ))}
    </div>
  );
};

export default Productos;
