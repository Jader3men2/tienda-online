const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const TodosProductos = require("../controllers/productosController");

// configurar almacenamiento de imagenes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// rutas

router.post("/", upload.single("imagen"), TodosProductos.crearProducto);
router.get("/", TodosProductos.mostrarProductos);
router.get("/categoria/:categoria", TodosProductos.mostrarPorCategoria);
router.put("/:id", upload.single("imagen"), TodosProductos.actualizarProductos);
router.delete("/:id", TodosProductos.eliminarProducto);

module.exports = router;
