import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
// Datos de ejemplo para los cursos
const courses = [
  { id: '1', title: 'Curso de React Native' , img: require('../../../assets/react.png') },
  { id: '2', title: 'Curso de JavaScript', img: require('../../../assets/java.png') },
  { id: '3', title: 'Curso de Diseño UX/UI' , img: require('../../../assets/diseno.png') },
  { id: '4', title: 'Matematicas Avanzada calculo 4' , img: require('../../../assets/mate.png') },
  // Agrega más cursos aquí
];
 
// Modificamos el componente para recibir la prop de `navigation`
const Cursos = ({ navigation }) => {
 
  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => {
        console.log(`Navegando a ${item.title}`);
        switch (item.title) {
          case 'Curso de JavaScript':
            navigation.navigate('MaterialEstudioJava');
            break;
          case 'Curso de React Native':
            navigation.navigate('MaterialEstudioReactNative');
            break;
          case 'Curso de Diseño UX/UI':
            navigation.navigate('MaterialEstudioUXUI');
            break;
          case 'Matematicas Avanzada calculo 4':
            navigation.navigate('MaterialEstudioMate');
            break;
          default:
            console.log('Curso no encontrado');
            break;
        }
      }}
    >
      <Image source={item.img} style={styles.image} />  
      <Text style={styles.courseTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}> 
      <View style={styles.innerContainer}>
        <Text style={styles.title}>CURSOS</Text> 
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
 
// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fondo negro
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red', // Texto rojo
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'red', // Color del borde
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  courseItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  courseTitle: {
    fontSize: 18,
    color: 'white',
  },
});
 
export default Cursos;