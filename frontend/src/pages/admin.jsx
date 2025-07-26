import React, { useState } from "react";
import "../estilos/Admin.css";
import AdminProductos from "../components/AdminProducto";
import AdminInicio from "../components/AdminInicio";
import AdminMostrar from "../components/AdminMostrar";
import AdminFrases from "../components/AdminFrases";

const Admin = () => {
  const [opcion, setOpcion] = useState("opcion0");

  const mostrarContenido = (id) => {
    setOpcion(id);
  };

  return (
    <div className="container_admin">
      <h1>Panel de administrador</h1>
      <nav className="container_nav">
        <div className="botones">
          <button
            className={`boton ${opcion === "opcion1" ? "opcion" : ""}`}
            onClick={() => mostrarContenido("opcion1")}
          >
            Subir productos
          </button>
          <button
            className={`boton ${opcion === "opcion2" ? "opcion" : ""}`}
            onClick={() => mostrarContenido("opcion2")}
          >
            Imágenes de inicio
          </button>
        </div>
        <div className="botones">
          <button
            className={`boton ${opcion === "opcion3" ? "opcion" : ""}`}
            onClick={() => mostrarContenido("opcion3")}
          >
            Gestionar productos
          </button>
          <button
            className={`boton ${opcion === "opcion4" ? "opcion" : ""}`}
            onClick={() => mostrarContenido("opcion4")}
          >
            Gestionar frases
          </button>
        </div>
      </nav>

      <main>
        {opcion === "opcion1" && <AdminProductos />}
        {opcion === "opcion2" && <AdminInicio />}
        {opcion === "opcion3" && <AdminMostrar />}
        {opcion === "opcion4" && <AdminFrases />}
      </main>
    </div>
  );
};

export default Admin;
