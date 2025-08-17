import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import TallasSelector from "../components/TallasSelector";

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setproductos] = useState([]);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState("");
  const { addToCart } = useContext(CartContext);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([null]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categorias/");
        if (!res.ok) throw new Error("Error al cargar categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };
    fetchCategorias();
  }, []); // se ejecutara cuando la categoria cambie de URL

  const handleCategoriaClick = async (categoria) => {
    setCategoriaSeleccionada(categoria);
    try {
      const res = await fetch(
        `http://localhost:3000/api/productos/categoria/${categoria}`
      );

      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();
      setproductos(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const handleAddToCart = (producto) => {
    const talla = tallasSeleccionadas[producto._id];
    if (!talla) {
      alert("por favor, selecciona una talla ");
      return;
    }

    const productoParaCarrito = {
      _id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagenUrl: producto.imagenUrl,
      talla,
    };

    addToCart(productoParaCarrito);
  };

  if (categorias.length === 0) {
    return <div>Cargando productos o no se encuentra</div>;
  }

  return (
    <div>
      <div className="container-categoria">
        <h2>categorías disponibles</h2>
        {categorias.map((cat, index) => (
          <button key={index} onClick={() => handleCategoriaClick(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {categoriaSeleccionada && (
        <div>
          <h2>productos en: {categoriaSeleccionada}</h2>
          <div>
            {productos.map((prod) => (
              <div key={prod._id}>
                <Link to={`/producto/${prod._id}`}>
                  <img
                    src={`http://localhost:3000${prod.imagenUrl}`}
                    alt="imagen producto"
                  />
                </Link>

                <h3>{prod.nombre}</h3>
                <p>${prod.precio}</p>
                {prod.tallas && prod.tallas.length > 0 && (
                  <TallasSelector
                    tallas={prod.tallas}
                    tallaSeleccionada={tallasSeleccionadas[prod._id || ""]}
                    setTallaSeleccionada={(talla) =>
                      setTallasSeleccionadas((prev) => ({
                        ...prev,
                        [prod._id]: talla,
                      }))
                    }
                  />
                )}
                <button onClick={() => handleAddToCart(prod)}>
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categoria;
