import React from "react";
import { useState, useContext, useEffect } from "react";
import { ImagenesContext } from "../context/ImagenesContext";
import "../estilos/AdminInicio.css";

const AdminInicio = () => {
  const [imagenesSubir, setImagenesSubir] = useState([]);
  const [previsualizacion, setprevisualizacion] = useState([]);
  const { imagenes, setImagenes } = useContext(ImagenesContext);

  //mostrar las imagenes
  useEffect(() => {
    const fecthImagenes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inicio/imagenes");
        const data = await res.json();
        setImagenes(data); // daba un array de strings
      } catch (error) {
        console.error("Erroe al cargar imágenes", error);
      }
    };
    fecthImagenes();
  }, [setImagenes]);

  const manejarCambio = (e) => {
    const archivos = Array.from(e.target.files);
    setImagenesSubir(archivos);

    //previews
    setprevisualizacion(archivos.map((file) => URL.createObjectURL(file)));
  };

  const manejarSubida = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    imagenesSubir.forEach((img) => formData.append("imagenes", img));

    try {
      const res = await fetch("http://localhost:3000/api/inicio/imagenes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert("Imagen subida correctamente");

      setImagenes((prev) => [...prev, ...data.imagenes]);

      // limpiar el input y la previews
      setImagenes([]);
      setprevisualizacion([]);
    } catch (err) {
      console.error("Error al subir la imagen", err);
    }
  };

  //Eliminar las imagenes
  const eliminarImagen = async (url) => {
    const partes = url.split("/");

    const nombreArchivo = partes[partes.length - 1]; // extraer el nombre el archivo
    console.log("url imagen", nombreArchivo);
    try {
      const res = await fetch(
        `http://localhost:3000/api/inicio/imagenes/${nombreArchivo}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      alert(data.mensaje);

      //Actualiza el estado al quitar las imagenes eliminadas
      setImagenes((prev) => prev.filter((img) => img !== url));
    } catch (error) {
      console.error("Error al eliminar imagen", error);
    }
  };

  return (
    <div className="container_padre">
      <h2>Añadir imagenes</h2>
      <form onSubmit={manejarSubida}>
        <input type="file" multiple onChange={manejarCambio} />
        <div className="imagen_preview">
          {previsualizacion.map((url, index) => (
            <img key={index} src={url} alt={`preview-${index}`} width="100" />
          ))}
        </div>
        <button type="submit">Subir imagen</button>
      </form>

      <h3>Imagenes guardas en el servidor</h3>
      <div className="imagen_guardadas">
        {imagenes.map((url, index) => {
          return (
            <div key={index}>
              <img
                src={`http://localhost:3000${url}`}
                alt={`imagen-${index}`}
              />
              <button onClick={() => eliminarImagen(url)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminInicio;
