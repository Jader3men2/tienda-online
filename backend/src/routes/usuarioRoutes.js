const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

// Registro de un nuevo usuario
router.post('/registro', usuarioController.registrarUsuario);

// Inicio de sesión
router.post('/login', usuarioController.loginUsuario);

// Obtener información del usuario autenticado
router.get('/me', requireAuth, usuarioController.obtenerPerfil);

// Actualizar información del usuario autenticado
router.put('/me', requireAuth, usuarioController.actualizarPerfil);

// Rutas de administrador (opcionales)
router.get('/', requireAuth, requireAdmin, usuarioController.listarUsuarios);
router.get('/:id', requireAuth, requireAdmin, usuarioController.obtenerUsuarioPorId);
router.put('/:id', requireAuth, requireAdmin, usuarioController.actualizarUsuario);
router.put('/:id/rol', requireAuth, requireAdmin, usuarioController.actualizarRolUsuario);

module.exports = router;