import React from "react";
import { useState } from "react";
import "../estilos/AdminProducto.css";

const AdminProductos = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [tallasInput, setTallasInput] = useState("");
  const [image, setImagen] = useState(null);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("precio", precio);

    const tallasArray = tallasInput
      .replace(/\s*y\s*/g, ",")
      .split(",")
      .map((talla) => talla.trim())
      .filter((talla) => talla.length > 0);

    // iterar sobre el array y añadir cada talla al formData
    tallasArray.forEach((talla) => {
      formData.append("tallas[]", talla);
    });

    formData.append("imagen", image);

    try {
      const res = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        body: formData,
      });

      //verificar si la respuesta es correcta
      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.status}`);
      }

      await res.json();
      alert("Producto subido con éxito.");
    } catch (err) {
      console.error("Error al subir producto", err);
    }
  };

  return (
    <form className="container_form" onSubmit={manejarEnvio}>
      <div className="titulo">
        <h2>Añadir producto</h2>
      </div>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoría"
        onChange={(e) => setCategoria(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tallas: S, M, L o S y L"
        value={tallasInput}
        onChange={(e) => setTallasInput(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        required
      />

      <button type="submit">Subir productos</button>
    </form>
  );
};

export default AdminProductos;
