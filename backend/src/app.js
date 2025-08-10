require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuarioRoutes");
const connectDB = require("./database/database");
const productosRoutes = require("./routes/productosRoutes");
const inicioFotosRouter = require("./routes/inicioFotosRoutes");
const frasesOfertasRoutes = require("./routes/frasesOfertasRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const app = express();
const path = require("path");
const port = 3000;
const cors = require("cors");
const frasesOfertas = require("./models/frasesOfertas");

app.use(cors());

//conectar la base de datos
console.log("Valor de MONGO_URI en app.js:", process.env.MONGO_URI);
connectDB();

// Middleware para analizar el cuerpo de las peticiones como JSON
app.use(bodyParser.json());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); // Para analizar cuerpos de petición URL-encoded

// Usar las rutas de usuario bajo el prefijo /api/usuarios
app.use("/api/usuarios", usuarioRoutes);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/productos", productosRoutes);

app.use("/api/inicio", inicioFotosRouter);

//rupa frases
app.use("/api", frasesOfertasRoutes);

//rupa pedidos
app.use("/api/pedidos", pedidoRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
