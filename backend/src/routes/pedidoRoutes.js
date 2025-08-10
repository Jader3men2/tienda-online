const express = require("express");
const router = express.Router();
const pedidoController = require("../controllers/pedidosControllers");

router.post("/crear", pedidoController.crearPedido);
router.get("/", pedidoController.obtenerPedidos);
router.put("/:id/estado", pedidoController.actualizarEstado);

module.exports = router;
