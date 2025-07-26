import React, { useContext, useEffect, useState } from "react";
import "../estilos/SlideFotos.css";
import { ImagenesContext } from "../context/ImagenesContext";

//mostrar las diferentes imagenes al inicio de la web
function SlideFotos() {
  const [frases, setFrases] = useState({ frase1: "", frase2: "", frase3: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/frases")
      .then((res) => res.json())
      .then((data) => setFrases(data));
  }, []);
  const { imagenes, setImagenes } = useContext(ImagenesContext);

  useEffect(() => {
    const fecthImagenes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inicio/imagenes");
        const data = await res.json();
        setImagenes(data);
      } catch (error) {
        console.error("Error al cargar imagenes", error);
      }
    };
    fecthImagenes();
  }, [setImagenes]);

  return (
    <section className="container-fotos">
      {imagenes.slice(0, 2).map((url, index) => (
        <img
          key={index}
          src={`http://localhost:3000${url}`}
          alt={`Imagen ${index}`}
          className="foto-ropa"
        />
      ))}

      {imagenes.slice(2, 3).map((url, index) => (
        <img
          key={index}
          src={`http://localhost:3000${url}`}
          alt={`Imagen ${index}`}
          className="foto-ropa1"
        />
      ))}
      <h3 className="maquina-escribir">{frases.frase2}</h3>
      <h3 className="maquina-escribir2">{frases.frase3}</h3>
    </section>
  );
}

export default SlideFotos;
