import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Aquí debes importar tus componentes para las pantallas correspondientes
// Reemplaza estos nombres por las pantallas que ya tienes


import MaterialEstudioReactNative from '../alumno/MaterialEstudioReactNative';
import MaterialEstudioJava from '../alumno/MaterialEstudioJava';
import MaterialEstudioUXUI from '../alumno/MaterialEstudioUXUI';
import MaterialEstudioMate from '../alumno/MaterialEstudioMate';

const Cursos1 = ({ navigation }) => {
  const [cursos, setCursos] = useState([]);  // Almacenamos los cursos combinados
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Estado de error

  // Estados para el formulario de crear curso
  const [nombreCurso, setNombreCurso] = useState('');
  const [abreviatura, setAbreviatura] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState('');
  const [estatus, setEstatus] = useState('');
  const [img, setImg] = useState('');
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);

  // Cursos locales
  const cursosLocales = [
    { id: '1', nombreCurso: 'Curso de React Native', screen: 'MaterialEstudioReactNative' },
    { id: '2', nombreCurso: 'Curso de JavaScript', screen: 'MaterialEstudioJava' },
    { id: '3', nombreCurso: 'Curso de Diseño UX/UI', screen: 'MaterialEstudioUXUI' },
    { id: '4', nombreCurso: 'Matemáticas Avanzada Cálculo 4', screen: 'MaterialEstudioMate' },
  ];

  // Función que obtiene los cursos desde la API
  const obtenerCursos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/api/courses');
      setCursos(respuesta.data);  // Almacenamos los cursos de la base de datos en el estado
      setCargando(false);  // Dejamos de cargar
    } catch (err) {
      setError(err.message);  // Si ocurre un error, lo mostramos
      setCargando(false);  // Dejamos de cargar
    }
  };

  // Función para crear un nuevo curso
  const crearCurso = async () => {
    if (!nombreCurso || !abreviatura || !fechaInicio || !fechaFin || !cupoMaximo) {
      Alert.alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
      Alert.alert('Por favor, ingrese fechas válidas');
      return;
    }

    try {
      const nuevoCurso = {
        nombreCurso,
        abreviatura,
        fechaInicio: fechaInicioDate,
        fechaFin: fechaFinDate,
        cupoMaximo: parseInt(cupoMaximo),
        estatus,
        img,
      };

      await axios.post('http://localhost:5000/api/courses', nuevoCurso);

      // Limpiar los campos del formulario
      setNombreCurso('');
      setAbreviatura('');
      setFechaInicio('');
      setFechaFin('');
      setCupoMaximo('');
      setEstatus('');
      setImg('');

      // Volver a obtener los cursos para actualizar la lista
      obtenerCursos();
      Alert.alert('Curso creado con éxito');
      setMostrandoFormulario(false); // Ocultar el formulario después de crear el curso
    } catch (err) {
      console.error('Error al crear el curso', err);
      Alert.alert('Error al crear el curso', err.message);
    }
  };

  // Usamos useEffect para cargar los cursos de la base de datos
  useEffect(() => {
    obtenerCursos();
  }, []);

  // Combinar los cursos locales con los cursos obtenidos de la base de datos
  const cursosCombinados = [...cursosLocales, ...cursos];

  // Renderizamos la pantalla de carga o los cursos según el estado
  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cursos Disponibles</Text>

      {/* Botón para mostrar el formulario de crear curso */}
      <Button title="Crear Nuevo Curso" onPress={() => setMostrandoFormulario(true)} />

      {/* Si estamos mostrando el formulario, renderizamos los campos */}
      {mostrandoFormulario && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del curso"
            value={nombreCurso}
            onChangeText={setNombreCurso}
          />
          <TextInput
            style={styles.input}
            placeholder="Abreviatura"
            value={abreviatura}
            onChangeText={setAbreviatura}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de inicio (YYYY-MM-DD)"
            value={fechaInicio}
            onChangeText={setFechaInicio}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de fin (YYYY-MM-DD)"
            value={fechaFin}
            onChangeText={setFechaFin}
          />
          <TextInput
            style={styles.input}
            placeholder="Cupo máximo"
            keyboardType="numeric"
            value={cupoMaximo}
            onChangeText={setCupoMaximo}
          />
          <TextInput
            style={styles.input}
            placeholder="Estatus (opcional)"
            value={estatus}
            onChangeText={setEstatus}
          />
          <TextInput
            style={styles.input}
            placeholder="URL de la imagen (opcional)"
            value={img}
            onChangeText={setImg}
          />
          <Button title="Crear Curso" onPress={crearCurso} />
        </View>
      )}

      {/* Mostrar los cursos combinados (locales + API) */}
      <FlatList
        data={cursosCombinados}
        keyExtractor={(item) => item.id} // Usamos 'id' como clave única para todos los elementos
        renderItem={({ item }) => (
          <View style={styles.itemCurso}>
            {/* Si es un curso local, al hacer clic vamos a la pantalla correspondiente */}
            {item.id <= 4 ? (
              <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                <Text style={styles.nombreCurso}>{item.nombreCurso}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.nombreCurso}>{item.nombreCurso}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formulario: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 5,
  },
  itemCurso: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  nombreCurso: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cursos1;
