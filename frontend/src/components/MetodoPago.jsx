import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { usePedido } from "../context/usePedido";
import { FaTrash } from "react-icons/fa";
import "../estilos/MetodoPago.css";
import { useNavigate } from "react-router-dom";
import { crearPedido } from "../services/pedidoService";

const MetodoPago = ({ onBack }) => {
  const { cart, decreaseQuantity, clearCart } = useCart();
  const { datosPedido, actualizarPedido, limpiarPedido } = usePedido();
  const navigate = useNavigate();

  //Estado para mensajes del usuario
  const [errorMensaje, setErrorMensaje] = useState(null);

  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(
    datosPedido.MetodoPago || ""
  );

  // EFECTO PARA ACTUALIZAR EL METODO DE PAGO SELECCIONADO
  useEffect(() => {
    actualizarPedido({ MetodoPago: metodoPagoSeleccionado });
  }, [metodoPagoSeleccionado, actualizarPedido]);

  //si no hay producto se mostrara un mensaje
  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }
  // calculo de la compra.
  const totalCantidad = cart.reduce((acc, item) => acc + item.quanty, 0);
  const totalSinDescuento = cart.reduce(
    (acc, item) => acc + item.precio * item.quanty,
    0
  );
  const descuento = totalCantidad >= 4 ? totalSinDescuento * 0.15 : 0;
  const totalConDescuento = totalSinDescuento - descuento;

  const handleFinalizarCompra = async () => {
    setErrorMensaje(null);
    try {
      console.log(cart, "como se envia al back"); // borrar
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!usuario || !usuario._id) {
        setErrorMensaje("Para finalizar la compra, debes iniciar sesión.");
        return;
      }

      //validar que han seleccionado un metodo de pago
      if (!metodoPagoSeleccionado) {
        setErrorMensaje("Por favor, seleccione un metodo de pago.");
        return;
      }

      //validar los datos de los pasos anteriores
      const {
        nombreCliente,
        emailCliente,
        direccionEnvio,
        cuidadEnvio,
        barrioEnvio,
        cedulaCliente,
        telefonoCliente,
        total,
      } = datosPedido;

      if (
        !nombreCliente ||
        !cedulaCliente ||
        !telefonoCliente ||
        !emailCliente ||
        !direccionEnvio ||
        !cuidadEnvio ||
        !barrioEnvio ||
        !total
      ) {
        setErrorMensaje(
          "Faltan datos de la informacion personal para el envio del pedido."
        );

        return;
      }

      //construir el objeto del pedido con todos los datos
      const nuevoPedido = {
        usuarioId: usuario._id,
        productos: cart.map((item) => ({
          productoId: item._id || item._id,
          cantidad: item.quanty,
          nombre: item.nombre,
          tallas: item.talla,
          precioUnitario: item.precio,
        })),

        total: datosPedido.total.toFixed(3),
        //datos informacion personal
        nombreCliente: datosPedido.nombreCliente,
        emailCliente: datosPedido.emailCliente,
        cedulaCliente: datosPedido.cedulaCliente,
        telefenoCliente: datosPedido.telefenoCliente,
        //datos de direccion de envio
        cuidadEnvio: datosPedido.cuidadEnvio,
        direccionEnvio: datosPedido.direccionEnvio,
        barrioEnvio: datosPedido.barrioEnvio,
        metodoEnvio: datosPedido.MetodoPago,
      };

      await crearPedido(nuevoPedido);
      clearCart();
      limpiarPedido();
      alert("compra exitosa"), navigate("/");
    } catch (error) {
      console.error("Error al crear pedido", error);
      setErrorMensaje(
        "No se pudo completar la compra. Por favor, inténtalo de nuevo."
      );
    }
  };
  return (
    <div className="contenido-padre">
      <div className="container-pago">
        <h2 className="titulo_pagos">Método dePagos</h2>
        <h3 className="instruccion-pago">
          Selecciona cómo deseas pagar tu pedido:
        </h3>
        <div className="pagos">
          <input
            type="radio"
            id="contraentrega"
            name="metodoPago"
            value="Contra entrega"
            checked={metodoPagoSeleccionado === "Contra entrega"}
            onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
          />
          <label htmlFor="contraentrega">Pago contra entrega</label>
          <i className="icono_pa fa fa-shopping-cart"></i>
        </div>
        <div className="pagos">
          <input
            type="radio"
            id="Nequi"
            name="metodoPago"
            value="Nequi"
            checked={metodoPagoSeleccionado === "Nequi"}
            onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
          />
          <label htmlFor="Nequi">Nequi</label>
        </div>

        {/* resumen de informacion  */}
        <div className="container_resumen-datos">
          <h3>Datos personales y Envio</h3>
          <p>
            <strong>Nombre:</strong>
            {datosPedido.nombreCliente}
          </p>
          <p>
            <strong>Cedula:</strong>
            {datosPedido.cedulaCliente}
          </p>
          <p>
            <strong>Email:</strong>
            {datosPedido.emailCliente}
          </p>
          <p>
            <strong>Telefeno:</strong>
            {datosPedido.TelefonoCliente}
          </p>
          <p>
            <strong>Cuidad:</strong>
            {datosPedido.cuidadEnvio}
          </p>
          <p>
            <strong>Dirección:</strong>
            {datosPedido.direccionEnvio}
          </p>
          <p>
            <strong>Barrio:</strong>
            {datosPedido.barrioEnvio}
          </p>
          <p>
            <strong>metodo:</strong>
            {datosPedido.MetodoPago}
          </p>
        </div>
      </div>

      <div className="metodo_pago">
        <h2>Resumen de compra</h2>

        <div className="container1">
          <h3>Productos en el carrito</h3>
          {cart.map((item, index) => (
            <div
              key={`${item._id} -${item.talla || index}`}
              className="container_producto"
            >
              <img
                src={`http://localhost:3000${item.imagenUrl}`}
                alt="imagen producto"
              />
              <h3 className="nombre_producto">{item.nombre}</h3>
              <p className="producto_talla">Talla: {item.talla}</p>
              <span className="producto_precio">${item.precio}</span>
              <span className="producto_cantidad"> Cantidad {item.quanty}</span>
              <button
                className="buton"
                onClick={() => decreaseQuantity(item._id, item.talla)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="container_resumen">
          <h2>Resumen del pago</h2>
          <div className="subTotal">
            <h3 className="titulo3">
              <strong>Subtotal</strong>
            </h3>
            <span>${totalSinDescuento.toFixed(3)}</span>
          </div>
          <div className="con-descuento">
            <h3>
              <strong> Descuento 15%:</strong>
            </h3>
            {datosPedido.descuentoAplicado > 0 ? (
              <span className="descuento">
                -${datosPedido.descuentoAplicado.toFixed(3)}
              </span>
            ) : (
              <span className="descuento">-$0.000</span>
            )}
          </div>

          <div className="total-final">
            <h3>
              <strong>Total a pagar:</strong>
            </h3>
            <span>
              $
              {datosPedido.total
                ? datosPedido.total.toFixed(3)
                : totalConDescuento.toFixed(3)}
            </span>
          </div>

          {errorMensaje && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {errorMensaje}
            </p>
          )}
          <button className="boton_info" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
          <button type="botton" onClick={onBack}>
            Atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetodoPago;
