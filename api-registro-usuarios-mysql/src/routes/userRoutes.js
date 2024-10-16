// Importamos Express para crear el router
const express = require('express');
// Importamos el controlador de usuarios
const userController = require('../controllers/userController');
// Importamos el middleware de autenticación
const auth = require('../middleware/auth');

// Creamos un nuevo router
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para obtener el perfil del usuario (protegida por autenticación)
router.get('/profile', auth, userController.getProfile);

// Exportamos el router
module.exports = router;