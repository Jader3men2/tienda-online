const path = require("path");
const fs = require("fs");
const Producto = require("../models/productos");

//crear producto
exports.crearProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio, tallas, descripcion } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : "";

    let tallasFormatiadas = tallas;
    if (typeof tallas === "string") {
      tallasFormatiadas = tallas.split(",").map((talla) => talla.trim());
    }
    const nuevoProducto = new Producto({
      nombre,
      categoria,
      precio,
      tallas: tallasFormatiadas,
      descripcion,
      imagenUrl,
    });
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

//Mostrar productos
exports.mostrarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al mostrar productos", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// mostrar productos por categoria
exports.mostrarPorCategoria = async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.categoria });
    res.json(productos);
  } catch (error) {
    res.error(500).json({ mensaje: "Erro al mostrar productos" });
  }
};

//Actualizar productos
exports.actualizarProductos = async (req, res) => {
  try {
    const { nombre, categoria, precio, tallas, descripcion } = req.body;
    const datosActualizados = {
      nombre,
      categoria,
      precio,
      tallas,
      descripcion,
    };

    if (req.file) {
      datosActualizados.imagenUrl = `/uploads/${req.file.filename}`;
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true }
    );

    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar productos:", error);
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
};

//Eliminar productos
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!Producto) {
      return res.status(404).json({ mensaje: "producto no encontrado" });
    }

    const nombreArchivo = path.basename(producto.imagenUrl);

    //ruta de la imagen en el backend
    const rutaImagen = path.resolve(
      __dirname,
      "..",
      "..",
      "uploads",
      nombreArchivo
    );
    //Eliminar imagen del disco
    fs.unlink(rutaImagen, (err) => {
      if (err) {
        console.error("Error al eliminar imagen", err);
      }
    });

    //Eliminar el documento de mongoDB
    await producto.deleteOne();

    res.json({ mensaje: "Producto e imagen eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
