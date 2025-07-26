const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  precio: Number,
  tallas: String,
  imagenUrl: String,
  descripcion: String,
});

module.exports = mongoose.model("Producto", productoSchema);
