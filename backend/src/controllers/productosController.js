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

//mostrar productos por id
exports.mostrarPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(400).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al mostrar productos" });
  }
};

// mostrar productos por categoria
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Producto.distinct("categoria");
    console.log(categorias, "jjj");
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error en distinct", error);
    res.status(500).json({ mensaje: "Error al mostrar productos", error });
  }
};

//obtener productos por categoria

exports.obtenerPorCategoria = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const productos = await Producto.find({ categoria });

    if (productos.length === 0) {
      return res
        .status(400)
        .json({ mensaje: "No hay productos en esta categoría" });
    }

    res.json(productos);
  } catch (error) {
    console.error("Error obteniendo productos por categoría", error);
    res.status(500), json({ mensaje: "Error en el servidor" });
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
