import React from "react";
import { useState } from "react";
import { Form } from "react-router-dom";
import ResumenCompra from "../components/ResumenCompra.jsx";
import AgregarInformacion from "../components/AgregarInformacion.jsx";
import MetodoPago from "../components/MetodoPago.jsx";
import MetodoEnvio from "../components/MetodoEnvio.jsx";

const Checkout = () => {
  const [opcion, setOpcion] = useState("opcion1");

  const mostrarContenido = (id) => {
    setOpcion(id);
  };

  return (
    <div className="checkout">
      <nav className="nav_checkout">
        <button className="botton" onClick={() => mostrarContenido("opcion1")}>
          Resumen de compra
        </button>
        <button className="botton" onClick={() => mostrarContenido("opcion2")}>
          Agregar información
        </button>
        <button className="botton" onClick={() => mostrarContenido("opcion3")}>
          Método de envío
        </button>
        <button className="botton" onClick={() => mostrarContenido("opcion4")}>
          Método de pago{" "}
        </button>
      </nav>

      <main className="container_checkout">
        {opcion === "opcion1" && <ResumenCompra />}
        {opcion === "opcion2" && <AgregarInformacion />}
        {opcion === "opcion3" && <MetodoEnvio />}
        {opcion === "opcion4" && <MetodoPago />}
      </main>
    </div>
  );
};

export default Checkout;
