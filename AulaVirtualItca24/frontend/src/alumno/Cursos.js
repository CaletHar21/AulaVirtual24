import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Datos de ejemplo para los cursos
const courses = [
  { id: '1', title: 'Curso de React Native' },
  { id: '2', title: 'Curso de JavaScript' },
  { id: '3', title: 'Curso de Diseño UX/UI' },
  // Agrega más cursos aquí
];

const Cursos = (navigation) => {
  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <LinearGradient
      colors={['#873b41', '#fdfdfd', '#fdfdfd']}  // Colores del gradiente
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Cursos</Text>
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </LinearGradient>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  courseItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseTitle: {
    fontSize: 18,
    color: '#333',  },
});

export default Cursos;
