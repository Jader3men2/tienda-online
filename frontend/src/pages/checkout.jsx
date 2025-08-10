import React from "react";
import { useState } from "react";
import { Form } from "react-router-dom";
import ResumenCompra from "../components/ResumenCompra.jsx";
import AgregarInformacion from "../components/AgregarInformacion.jsx";
import MetodoPago from "../components/MetodoPago.jsx";
import MetodoEnvio from "../components/MetodoEnvio.jsx";

const Checkout = () => {
  const [paso, setPaso] = useState(1);

  const avanzarPaso = () => setPaso((prev) => prev + 1);
  const retrocederPaso = () => setPaso((prev) => prev - 1);

  return (
    <div className="checkout">
      <nav className="nav_checkout">
        <button
          className="botton"
          disabled={paso !== 1}
          onClick={() => setPaso(1)}
        >
          Resumen de compra
        </button>
        <button
          className="botton"
          disabled={paso !== 2}
          onClick={() => setPaso(2)}
        >
          Agregar información
        </button>
        <button
          className="botton"
          disabled={paso !== 3}
          onClick={() => setPaso(3)}
        >
          Método de envío
        </button>
        <button
          className="botton"
          disabled={paso !== 4}
          onClick={() => setPaso(4)}
        >
          Método de pago
        </button>
      </nav>

      <main className="container_checkout">
        {paso === 1 && <ResumenCompra onNext={avanzarPaso} />}
        {paso === 2 && (
          <AgregarInformacion onNext={avanzarPaso} onBack={retrocederPaso} />
        )}

        {paso === 3 && (
          <MetodoEnvio onNext={avanzarPaso} onBack={retrocederPaso} />
        )}
        {paso === 4 && (
          <MetodoPago onNext={avanzarPaso} onBack={retrocederPaso} />
        )}
      </main>
    </div>
  );
};

export default Checkout;
