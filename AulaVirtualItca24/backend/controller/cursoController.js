const Curso = require('../models/Curso');  // Asegúrate de que la ruta al modelo Curso es correcta

// Crear un nuevo curso
const createCourse = async (req, res) => {
    const { nombreCurso, fechaInicio, fechaFin, estatus, abreviatura, img, cupoMaximo } = req.body;
  
    try {
      // Crear un nuevo curso con los datos proporcionados
      const newCourse = new Curso({
        nombreCurso,
        fechaInicio,
        fechaFin,
        estatus,
        abreviatura,
        img,
        cupoMaximo
      });
  
      // Guardar el nuevo curso en la base de datos
      await newCourse.save();
      
      res.status(201).json({ message: 'Curso creado con éxito', course: newCourse });
    } catch (error) {
      console.error('Error al crear el curso:', error.message);  // Imprime el mensaje de error
      console.error('Detalles completos del error:', error); // Imprime el objeto completo del error
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  };
  
  

// Obtener todos los cursos
// Obtener todos los cursos
const getAllCourses = async (req, res) => {
    try {
      const courses = await Curso.find();  // Obtiene todos los cursos de la base de datos
      if (!courses) {
        return res.status(404).json({ message: 'No se encontraron cursos' });
      }
      res.status(200).json(courses);  // Devolver los cursos en formato JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los cursos' });
    }
  };
  

// Obtener un curso por su ID
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Curso.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el curso' });
  }
};

// Actualizar un curso por su ID
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { nombreCurso, fechaInicio, fechaFin, estatus, abreviatura, img, cupoMaximo } = req.body;

  try {
    const updatedCourse = await Curso.findByIdAndUpdate(
      id,
      { nombreCurso, fechaInicio, fechaFin, estatus, abreviatura, img, cupoMaximo },
      { new: true }  // Devuelve el curso actualizado
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.status(200).json({ message: 'Curso actualizado con éxito', course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el curso' });
  }
};

// Eliminar un curso por su ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Curso.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.status(200).json({ message: 'Curso eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el curso' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
