const Usuario = require("../models/usuario"); // importa el modelo Usuario desde la carpeta models.
const bcrypt = require("bcrypt"); // libreria para  poder encritar las contraseñas de usuarios.
const jwt = require("jsonwebtoken"); // libreria para generar token y sirve para la autenticación de usuarios.

// Clave secreta para firmar los tokens JWT (¡CAMBIA ESTO EN UN PROYECTO REAL!)
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_muy_segura"; // Usar variable de entorno

// funcion para la creacion de nuevos usarios.
exports.registrarUsuario = async (req, res) => {
  try {
    console.log("Cuerpo de la petición (registrarUsuario):", req.body);
    const { nombre, email, usuario, password, rol } = req.body;

    if (!nombre || !email || !usuario || !password || !rol) {
      return res
        .status(400)
        .json({ mensaje: "Todos los elementos son requeridos." });
    }

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ mensaje: "El email ya está registrado." });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      usuario,
      contrasenaHash: password,
      rol,
    }); // La contraseña se hashea en el pre('save') hook del modelo
    await nuevoUsuario.save();

    const token = jwt.sign(
      { userId: nuevoUsuario._id, rol: nuevoUsuario.rol },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ mensaje: "Usuario registrado con éxito.", token });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario." });
  }
};

// funcion para la entrar desde el login
exports.loginUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const user = await Usuario.findOne({ usuario }).select("+contrasenaHash"); // busca el usuario y selecciona explicitamente el campo contrasenaHash que normalmente esta oculto

    if (!user || !(await user.compararContrasena(contrasena))) {
      return res.status(401).json({ mensaje: "Credenciales inválidas." });
    }

    const token = jwt.sign({ userId: user._id, rol: user.rol }, JWT_SECRET, {
      expiresIn: "1h",
    }); // genera un token si la contraseña es validad.

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      rol: user.rol,
      usuario: user.usuario,
    });

    res.json({ mensaje: "Inicio de sesión exitoso.", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ mensaje: "Error al iniciar sesión." });
  }
};

// funcion para busqueda del perfil del usuario.
exports.obtenerPerfil = async (req, res) => {
  try {
    // busca el perfil del usuario autenticación (requireAuth) ya habrá establecido en req.usuario.
    const usuario = await Usuario.findById(req.usuario._id).select(
      "-contrasenaHash"
    ); // Excluir la contraseña hash
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ mensaje: "Error al obtener el perfil." });
  }
};

// funcion para la actualizacion del perfil.
exports.actualizarPerfil = async (req, res) => {
  try {
    //actualiza el peffil y devuelve el nuevo documento.
    const { nombre, email } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.usuario._id,
      { nombre, email },
      { new: true, select: "-contrasenaHash" }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ mensaje: "Error al actualizar el perfil." });
  }
};

// Funciones de administrador
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contrasenaHash");
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ mensaje: "Error al listar usuarios." });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select(
      "-contrasenaHash"
    );
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ mensaje: "Error al obtener usuario por ID." });
  }
};

//devuelve un usuario por el id
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, rol },
      { new: true, select: "-contrasenaHash" }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar usuario." });
  }
};

// actualizar el rol del usuario
exports.actualizarRolUsuario = async (req, res) => {
  try {
    //cambia de rol de usuario a admin.
    const { rol } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { rol },
      { new: true, select: "-contrasenaHash" }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error("Error al actualizar el rol del usuario:", error);
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el rol del usuario." });
  }
};
