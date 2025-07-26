const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const iniciFotosControllers = require("../controllers/inicioFotosControllers");

//Obtener imagenes
router.get("/imagenes", iniciFotosControllers.obtenerImagenes);

//Subir imaganes
router.post(
  "/imagenes",
  upload.array("imagenes", 3),
  iniciFotosControllers.subirImagenes
);

//Eliminar imagen por nombre
router.delete("/imagenes/:nombreArchivo", iniciFotosControllers.eliminarImagen);

module.exports = router;
