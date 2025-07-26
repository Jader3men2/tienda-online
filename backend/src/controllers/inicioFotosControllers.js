const fs = require("fs");
const path = require("path");

exports.subirImagenes = (req, res) => {
  console.log(req.files, "mostrar"); // borrar depurar
  try {
    const urls = req.files.map((file) => `/uploads/inicio/${file.filename}`);
    console.log(urls, "rutas");
    res.json({ mensaje: "Imagenes subidas con éxito", imagenes: urls });
  } catch (error) {
    console.log("Error al subir imagenes", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

exports.obtenerImagenes = (req, res) => {
  const ruta = path.join(__dirname, "..", "..", "uploads", "inicio");

  fs.readdir(ruta, (err, archivos) => {
    if (err) {
      console.error("Error al leer la carpeta de imágenes", err);
      return res.status(500).json({ mensaje: "Error al obtener las imágenes" });
    }

    //Devolver las urls para el frontend

    const urls = archivos.map((nombre) => `/uploads/inicio/${nombre}`);
    res.json(urls);
  });
};

exports.eliminarImagen = (req, res) => {
  const nombreArchivo = req.params.nombreArchivo;
  const ruta = path.resolve(
    __dirname,
    "..",
    "..",
    "uploads",
    "inicio",
    nombreArchivo
  );

  fs.unlink(ruta, (err) => {
    if (err) {
      console.error("Error al eliminar imagen", err);
      return res.status(500).json({ mensaje: "Error al eliminar imagen" });
    }
    res.json({ mensaje: " Imagen eliminada correctamente" });
  });
};
