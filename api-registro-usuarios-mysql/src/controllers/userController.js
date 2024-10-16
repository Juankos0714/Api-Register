// Importamos los módulos necesarios
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificamos si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generamos el token JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Enviamos la respuesta
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscamos el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Verificamos la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Generamos el token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Enviamos la respuesta
    res.json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Controlador para obtener el perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'username', 'email'],
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};