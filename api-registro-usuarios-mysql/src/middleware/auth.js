// Importamos el módulo jsonwebtoken para verificar los tokens
const jwt = require('jsonwebtoken');

// Middleware de autenticación
const auth = (req, res, next) => {
  // Obtenemos el token del header de la petición
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Si no hay token, devolvemos un error
  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Añadimos el usuario decodificado a la petición
    req.userId = decoded.id;
    next();
  } catch (error) {
    // Si el token no es válido, devolvemos un error
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Exportamos el middleware
module.exports = auth;