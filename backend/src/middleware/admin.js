// middleware de autorizacion. con este codigo se restringe el accesos a ciertas rutas y solo el admin puede acceder a ellas.

const requireAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'administrador') {
        next();
    } else {
        return res.status(403).json({ mensaje: 'Acceso prohibido. Se requiere rol de administrador.' });
    }
};

module.exports = requireAdmin;