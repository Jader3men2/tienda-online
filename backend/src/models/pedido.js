const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },

      cantidad: {
        type: Number,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      tallas: {
        type: String,
        required: true,
      },
      precioUnitario: {
        type: Number,
        requiered: true,
      },
    },
  ],
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  nombreCliente: { type: String, requiered: true },
  emailCliente: { type: String, requiered: true },
  cedulaCliente: { type: String, requiered: true },
  cuidadEnvio: { type: String, requiered: true },
  direccionEnvio: { type: String, requiered: true },
  barrioEnvio: { type: String, requiered: true },
  metodoEnvio: { type: String, requiered: true },

  total: { type: Number, required: true },
  estado: { type: String, default: "pendiente" },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pedido", PedidoSchema);
