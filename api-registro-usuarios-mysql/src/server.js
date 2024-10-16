// Importamos las variables de entorno
require('dotenv').config();

// Importamos la aplicación Express
const app = require('./app');

// Importamos la función de conexión a la base de datos
const { connectDB } = require('./config/database');

// Conectamos a la base de datos
connectDB();

// Definimos el puerto
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});