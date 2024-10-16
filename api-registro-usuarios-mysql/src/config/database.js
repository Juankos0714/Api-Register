// Importamos el módulo Sequelize
const { Sequelize } = require('sequelize');

// Creamos una nueva instancia de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Desactivamos el logging de las consultas SQL
});

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Intentamos autenticar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida con éxito');
  } catch (error) {
    // Si hay un error en la conexión, lo mostramos en la consola y terminamos el proceso
    console.error('Error al conectar a MySQL:', error.message);
    process.exit(1);
  }
};

// Exportamos la función de conexión y la instancia de Sequelize
module.exports = { connectDB, sequelize };