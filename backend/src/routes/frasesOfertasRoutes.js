const express = require("express");
const router = express.Router();
const {
  obtenerFrases,
  actualizarFrases,
} = require("../controllers/frasesOfertasControllers");

//Obtener frases
router.get("/frases", obtenerFrases);

//Actualizar frases
router.put("/frases", actualizarFrases);

module.exports = router;
