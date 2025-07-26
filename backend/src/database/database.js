//codigo para conectarse a una base de datos mongoDB

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tienda_de_ropa";
    await mongoose.connect(dbURI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
