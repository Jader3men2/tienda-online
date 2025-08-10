import { crearPedido } from "../../services/pedidoService";

export const finalizarCompra = async (pedidoData, navigate) => {
  try {
    const pedido = await crearPedido(pedidoData);
    localStorage.setItem("pedido", JSON.stringify(pedido));
    navigate("/Checkout/confirmacion");
  } catch (error) {
    alert("Hubo un error al procesar el pedido.", error);
  }
};
