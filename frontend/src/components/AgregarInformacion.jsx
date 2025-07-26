import React from "react";
import "../estilos/AgregarInformacion.css";

const AgregarInformacion = () => {
  return (
    <div className="contenido">
      <h2 className="titulo_info">Información</h2>
      <form className="formulario_checkout">
        <div className="columna1">
          <label className="label1">Correo</label>
          <input type="email" required className="input1" />

          <label className="label1">Nombre</label>
          <input type="text" required className="input1" />

          <label className="label1">Apellido</label>
          <input type="text" required className="input1" />

          <label className="label1">Cédula</label>
          <input type="text" required className="input1" />

          <label className="label1">Teléfono</label>
          <input
            type="tel"
            placeholder="3002456584"
            required
            className="input1"
          />

          <button className="btn_ir_envio" type="submit">
            Ir a envío
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarInformacion;
