// src/context/usePedido.js (o PedidoContext.js)
import React, { createContext, useState, useContext } from "react";
import { useCallback } from "react";

// 1. Crear el objeto de contexto
const PedidoContext = createContext(); // <-- ¡Aquí se crea!

// 2. Definir el proveedor del contexto
export const PedidoProvider = ({ children }) => {
  const [datosPedido, setDatosPedido] = useState({
    productos: [],
    usuarioId: null,
    total: 0,
    subtotal: 0,
    descuentoAplicado: 0,
    ciudadEnvio: "",
    direccionEnvio: "",
    barrioEnvio: "",
    metodoPago: "",
    nombreCliente: "",
    apellidoCliente: "",
    emailCliente: "",
    cedulaCliente: "",
    telefonoCliente: "",
  });

  const actualizarPedido = useCallback((nuevosDatos) => {
    setDatosPedido((prevData) => ({ ...prevData, ...nuevosDatos }));
  }, []);

  const limpiarPedido = useCallback(() => {
    setDatosPedido({
      productos: [],
      usuarioId: null,
      total: 0,
      subtotal: 0,
      descuentoAplicado: 0,
      ciudadEnvio: "",
      direccionEnvio: "",
      barrioEnvio: "",
      metodoPago: "",
      nombreCliente: "",
      apellidoCliente: "",
      emailCliente: "",
      cedulaCliente: "",
      telefonoCliente: "",
    });
  }, []);

  return (
    <PedidoContext.Provider
      value={{ datosPedido, actualizarPedido, limpiarPedido }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

// 3. Exportar el hook personalizado para consumir el contexto
export const usePedido = () => {
  return useContext(PedidoContext);
};
