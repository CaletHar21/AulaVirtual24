const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controlador para recuperar la contraseña
const recuperarContrasena = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Actualizar la contraseña del usuario

        await user.save(); // Guardar los cambios en la base de datos
        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { recuperarContrasena };
