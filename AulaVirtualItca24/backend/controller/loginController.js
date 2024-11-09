const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    console.log("Función loginUser llamada");
    const { username, password } = req.body; // Obtén el nombre de usuario y la contraseña del cuerpo de la solicitud
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

        // Responder con un mensaje de éxito, rol, nombre y apellido del usuario
        res.json({
            message: true,
            rol: user.rol,  // El rol del usuario
            nombres: user.nombres,  // Nombre del usuario
            apellidos: user.apellidos  // Apellidos del usuario
        });

    } catch (error) {
        console.log('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { loginUser };
