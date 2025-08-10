import React from "react";
import { useState, useEffect } from "react";
import "../estilos/AdminMostrar.css";

const AdminMostrar = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoria, setCategoria] = useState("todas");
  const [categorias, setCategorias] = useState([]);

  // obtener los productos
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

        //obtener productos por categoria
        const categoriasUnicas = [
          ...new Set(
            data
              .map((p) => p.categoria?.trim().toLowerCase())
              .filter((cat) => !!cat)
          ),
        ];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const filtrarProductos =
    categoria === "todas"
      ? productos
      : productos.filter(
          (p) =>
            p.categoria?.trim().toLowerCase() === categoria.trim().toLowerCase()
        );

  //eliminar productos

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro lo quieres eliminar?");
    if (!confirmar) return;
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProductos(productos.filter((p) => p._id !== id));
        alert("Producto eliminado");
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  if (cargando) return <p>Cargando productos...</p>;
  return (
    <div className="container">
      <h2>Productos existentes</h2>
      <table className="container_tabla">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>
              Categoria:
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="todas">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toLowerCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </th>
            <th>Precio</th>
            <th>Tallas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarProductos.length > 0 ? (
            filtrarProductos.map((producto) => (
              <tr key={producto._id}>
                <td>
                  <img
                    src={`http://localhost:3000${producto.imagenUrl}`}
                    width="60"
                    height="60"
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{Number(producto.precio).toLocaleString("es-CO")}</td>
                <td>{producto.tallas}</td>

                <td>
                  <button onClick={() => eliminarProducto(producto._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay productos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMostrar;
