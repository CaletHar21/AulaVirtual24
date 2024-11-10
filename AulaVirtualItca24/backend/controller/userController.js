// backend/controller/userController.js
const User = require('../models/User');  // Asegúrate de que la ruta al modelo es correcta

// Función para actualizar los datos de usuario
const updateUserProfile = async (req, res) => {
  const { correo, telefono, nombres, apellidos } = req.body;
  const userId = req.params.id;  // El ID del usuario se obtiene de los parámetros de la URL

  // Validar si se recibieron los datos necesarios
  if (!correo || !telefono) {
    return res.status(400).json({ success: false, message: 'Correo y teléfono son requeridos' });
  }

  try {
    // Buscar el usuario por su ID y actualizar los campos
    const user = await User.findByIdAndUpdate(
      userId,  // Buscamos al usuario por su ID
      { correo, telefono, nombres, apellidos },  // Actualizamos los campos adicionales
      { new: true }  // Nos devuelve el documento actualizado
    );

    // Verificar si el usuario fue encontrado
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Enviar la respuesta con el usuario actualizado
    res.json({ success: true, message: 'Perfil actualizado correctamente', user });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ success: false, message: 'Hubo un error al actualizar el perfil', error });
  }
};

// Exportar las funciones del controlador
module.exports = { updateUserProfile };
