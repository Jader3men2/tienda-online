import React from "react";
import "../estilos/MetodoEnvio.css";
import { useState } from "react";
import { usePedido } from "../context/usePedido";

const MetodoEnvio = ({ onNext, onBack }) => {
  const { datosPedido, actualizarPedido } = usePedido();

  //ESTADO DEL FORMULARIO
  const [cuidad, setCuidad] = useState(datosPedido.cuidadEnvio || "");
  const [direccion, setDireccion] = useState(datosPedido.direccionEnvio || "");
  const [barrio, setBarrio] = useState(datosPedido.barrioEnvio || "");

  // funcion del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (cuidad && direccion && barrio) {
      //guardar la informacion en usePedido
      actualizarPedido({
        cuidadEnvio: cuidad,
        direccionEnvio: direccion,
        barrioEnvio: barrio,
      });
      onNext();
    }
  };
  return (
    <div className="contenido">
      <h2 className="titulo_envio">Dirección de envío</h2>
      <form className="formulario_dire" onSubmit={handleSubmit}>
        <label className="labeldi">Ciudad:</label>
        <input
          type="text"
          required
          className="inputdi"
          value={cuidad}
          onChange={(e) => setCuidad(e.target.value)}
        />

        <label className="labeldi">Dirección:</label>
        <input
          type="text"
          required
          className="inputdi"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <label className="labeldi">Barrio:</label>
        <input
          type="text"
          required
          className="inputdi"
          value={barrio}
          onChange={(e) => setBarrio(e.target.value)}
        />

        <button type="submit" className="btn_ir_pago">
          Ir a pago
        </button>
        <button type="button" onClick={onBack}>
          Atrás
        </button>
      </form>
    </div>
  );
};

export default MetodoEnvio;
