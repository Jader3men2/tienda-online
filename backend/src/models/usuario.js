const mongoose = require("mongoose"); //libreria para comunicarnos con mongoDB.
const bcrypt = require("bcrypt"); // libreria para encriptar contraseñas de forma segura.

const UsuarioSchema = new mongoose.Schema({
  //define como deber ser el documento de usuario eb la base de dato.
  nombre: { type: String, required: true }, // campo obligatorio para el nombre de usuario.
  email: { type: String, require: true, unique: true },
  usuario: { type: String, require: true, unique: true },
  contrasenaHash: { type: String, required: true },
  rol: { type: String, enum: ["usuario", "administrador"], default: "usuario" },
  fechaRegistro: { type: Date, default: Date.now },
});

// Método para hashear la contraseña antes de guardar
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasenaHash")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contrasenaHash = await bcrypt.hash(this.contrasenaHash, salt);
  next();
});

// Método para comparar la contraseña
UsuarioSchema.methods.compararContrasena = async function (contrasena) {
  return await bcrypt.compare(contrasena, this.contrasenaHash);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
