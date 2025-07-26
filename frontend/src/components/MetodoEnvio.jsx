import React from "react";
import "../estilos/MetodoEnvio.css";

const MetodoEnvio = () => {
  return (
    <div className="contenido">
      <h2 className="titulo_envio">Dirección de envío</h2>
      <form className="formulario_dire">
        <label className="labeldi">Departamento:</label>
        <input type="text" required className="inputdi" />

        <label className="labeldi">Municipio:</label>
        <input type="text" required className="inputdi" />

        <label className="labeldi">Dirección:</label>
        <input type="text" required className="inputdi" />

        <label className="labeldi">Barrio:</label>
        <input type="text" required className="inputdi" />

        <label className="labeldi">Destinatario:</label>
        <input type="text" required className="inputdi" />

        <button className="btn_ir_pago" type="submit">
          Ir a pago
        </button>
      </form>
    </div>
  );
};

export default MetodoEnvio;
