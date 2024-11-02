const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    console.log("Función loginUser llamada");
    const { username, password } = req.body;
    console.log("Datos recibidos:", req.body);
    
    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });
        console.log("Usuario encontrado:", user);

        if (!user) {
            console.log('Usuario no encontrado:', username);
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        console.log('Contraseña en la base de datos:', user.password);
        console.log('Contraseña proporcionada:', password);

        // Usar bcrypt para comparar contraseñas
        const match = await bcrypt.compare(password, user.password);
        console.log('Resultado de la comparación:', match); // Esto mostrará true o false

        if (!match) {
            console.log('Contraseña inválida');
            return res.status(400).json({ message: 'Contraseña inválida' });
        }

        res.json({ message: 'LOGIN EXITOSO' });
    } catch (error) {
        console.log('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { loginUser };
