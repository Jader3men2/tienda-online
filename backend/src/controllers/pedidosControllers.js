const pedido = require("../models/pedido");

exports.crearPedido = async (req, res) => {
  try {
    const {
      productos,
      usuarioId,
      total,
      metodoPago,
      nombreCliente,
      emailCliente,
      direccionEnvio,
      cuidadEnvio,
      barrioEnvio,
      cedulaCliente,
      telefonoCliente,
    } = req.body;
    console.log(req.body); // borrar

    if (!productos || !usuarioId || !total) {
      return res.status(400).json({ error: "Datos incompletos" });
    }
    const nuevoPedido = new pedido({
      productos,
      usuarioId,
      total,
      metodoPago,
      nombreCliente,
      emailCliente,
      direccionEnvio,
      cuidadEnvio,
      barrioEnvio,
      cedulaCliente,
      telefonoCliente,
    });

    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    console.error("Error al crear el pedido en el servidor", error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await pedido
      .find()
      .populate("usuarioId", "nombre email usuario")
      .populate("productos.productoId", "nombre talla");
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const pedidoActualizado = await pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    res.status(200).json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado del pedido" });
  }
};
