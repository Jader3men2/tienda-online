import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import "../estilos/ResumenCompras.css";
import { useEffect } from "react";
import { usePedido } from "../context/usePedido";

export default function ResumenCompra({ onNext }) {
  const { cart, decreaseQuantity } = useCart();
  const { actualizarPedido } = usePedido();

  //
  const totalCantidad = cart.reduce((acc, item) => acc + item.quanty, 0);
  const totalSinDescuento = cart.reduce(
    (acc, item) => acc + item.precio * item.quanty,
    0
  );
  const descuento = totalCantidad >= 4 ? totalSinDescuento * 0.15 : 0;
  const totalConDescuento = totalSinDescuento - descuento;

  useEffect(() => {
    actualizarPedido({
      productos: cart,
      subtotal: totalSinDescuento,
      descuentoAplicado: descuento,
      total: totalConDescuento,
    });
  }, [cart, totalSinDescuento, descuento, totalConDescuento, actualizarPedido]);

  if (!Array.isArray(cart) || cart.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  return (
    <div className="resumen_compra">
      <h2>Resumen de compra</h2>
      <div className="container-hijo">
        <div className="container2">
          {cart.map((item) => (
            <div key={item._id} className="container_producto">
              <img
                src={`http://localhost:3000${item.imagenUrl}`}
                alt="imagen producto"
              />
              <h3 className="nombre_producto">{item.nombre}</h3>
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

        <div className="container_reco">
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
            {descuento > 0 && (
              <span className="descuento">-${descuento.toFixed(3)}</span>
            )}
          </div>

          <div className="total-final">
            <h3>
              <strong>Total a pagar:</strong>
            </h3>
            <span>${totalConDescuento.toFixed(3)}</span>
          </div>
          <button className="boton_info" onClick={onNext}>
            Agregar información
          </button>
        </div>
      </div>
    </div>
  );
}
