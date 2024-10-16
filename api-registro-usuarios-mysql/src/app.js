// Importamos los módulos necesarios
const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');

// Creamos la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de seguridad
app.use(helmet());

// Rutas de usuario
app.use('/api/users', userRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Exportamos la aplicación
module.exports = app;