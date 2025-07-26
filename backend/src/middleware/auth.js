const jwt = require('jsonwebtoken'); //importa el jsonweebtoken que sirve para crear y verificar el token.
const JWT_SECRET = 'tu_clave_secreta_muy_segura'; // Debe ser la misma clave que en el controlador
const usuarios = require('../controllers/usuarioController').usuarios; // Importar la "base de datos" de usuarios (para el ejemplo)

const requireAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = usuarios.find(u => u.id === decoded.userId);

        if (!usuario) {
            return res.status(401).json({ mensaje: 'Acceso denegado. Token inválido.' });
        }

        req.usuario = usuario; // guarda la información del usuario.
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token inválido.' });
    }
};

module.exports = requireAuth;