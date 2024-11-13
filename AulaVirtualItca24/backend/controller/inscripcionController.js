const Curso = require('../models/Inscripcion'); // Asegúrate de que la ruta es correcta
const Curso = require('../models/Curso'); 

// Controlador para obtener los cursos del usuario
const obtenerCursosPorUsuario = async (req, res) => {
    const { userId } = req.params; // Obtenemos el userId desde los parámetros de la URL

    try {
        // Buscar los cursos en la base de datos que coincidan con el userID
        const cursos = await Curso.find({ userID: userId });

        if (cursos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cursos para este usuario.' });
        }

        return res.json({ cursos });
    } catch (error) {
        console.log('Error al obtener los cursos:', error);
        res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};

module.exports = { obtenerCursosPorUsuario };
