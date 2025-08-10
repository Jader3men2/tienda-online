import axios from "axios";

const API_URL = "http://localhost:3000/api/pedidos";

export const crearPedido = async (pedido) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, pedido);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};
