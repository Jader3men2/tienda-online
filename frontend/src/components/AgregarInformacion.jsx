import React, { useState } from "react";
import "../estilos/AgregarInformacion.css";
import { usePedido } from "../context/usePedido";

const AgregarInformacion = ({ onNext, onBack }) => {
  const { datosPedido, actualizarPedido } = usePedido();

  //estados locaales del formulario
  const [email, setemail] = useState(datosPedido.emailCliente || "");
  const [nombre, setNombre] = useState(datosPedido.nombreCliente || "");
  const [cedula, setCedula] = useState(datosPedido.cedulaCliente || "");
  const [telefono, setTelefono] = useState(datosPedido.telefonoCliente || "");

  //funcion para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); //evita que la pagina se recargue

    if (email && nombre && cedula && telefono) {
      //guarda la informacion en usePedido
      actualizarPedido({
        emailCliente: email,
        nombreCliente: nombre,
        cedulaCliente: cedula,
        telefonoCliente: telefono,
      });
      onNext();
    }
  };

  return (
    <div className="contenido">
      <h2 className="titulo_info">Información</h2>
      <form className="formulario_checkout" onSubmit={handleSubmit}>
        <div className="columna1">
          <label className="label1">Correo</label>
          <input
            type="email"
            required
            className="input1"
            value={email}
            onChange={(e) => setemail(e.target.value)} //actualiza el estado local al escribir
          />

          <label className="label1">Nombre</label>
          <input
            type="text"
            required
            className="input1"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label className="label1">Cédula</label>
          <input
            type="number"
            required
            className="input1"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />

          <label className="label1">Teléfono</label>
          <input
            type="number"
            placeholder="3002456584"
            required
            className="input1"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <button type="submit" className="btn_ir_envio">
            Ir a envío
          </button>
          <button type="button" onClick={onBack}>
            Atrás
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarInformacion;
