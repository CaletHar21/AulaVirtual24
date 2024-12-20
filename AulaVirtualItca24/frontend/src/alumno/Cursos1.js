import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';  // Importar LinearGradient

// Datos de ejemplo para los cursos
const courses = [
  { id: '1', title: 'Curso de React Native', img: require('../../../assets/react.png') },
  { id: '2', title: 'Curso de JavaScript', img: require('../../../assets/java.png') },
  { id: '3', title: 'Curso de Diseño UX/UI', img: require('../../../assets/diseno.png') },
  { id: '4', title: 'Matematicas Avanzada calculo 4', img: require('../../../assets/mate.png') },
  // Agrega más cursos aquí si es necesario
];

const Cursos1 = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses); // Por defecto muestra todos los cursos

  // Recuperar el nombre del usuario desde AsyncStorage
  useEffect(() => {
    const getUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('userNames'); // Recuperar el nombre del usuario
        if (userName) {
          const lowerCaseUserName = userName.toLowerCase(); // Convertir el nombre a minúsculas
          setUserName(lowerCaseUserName); // Guardar el nombre en minúsculas
        }
      } catch (error) {
        console.error('Error al recuperar el nombre del usuario desde AsyncStorage', error);
      }
    };

    getUserName();
  }, []); // Esto solo se ejecuta una vez al montar el componente

  
  useEffect(() => {
    console.log(`Nombre del usuario: ${userName}`);  // Imprimir el nombre del usuario para ver si se recuperó bien
    if (userName === 'erick b.') {
      setFilteredCourses(courses.slice(0, 2)); // Solo los primeros dos cursos
      console.log('Cursos filtrados para Erick:', courses.slice(0, 2)); // Ver los cursos filtrados
    } else {
      setFilteredCourses(courses); 
      console.log('Cursos disponibles:', courses); // Ver todos los cursos disponibles
    }
  }, [userName]); // Se ejecuta cada vez que cambia el nombre del usuario

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
    <LinearGradient
      colors={['#85282f', '#e8ecf9', '#e8ecf9', '#fdfdfd']}  // Colores del gradiente
      style={styles.container}  // Estilo del contenedor
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>CURSOS</Text>
        {/* Mostrar el nombre del usuario para depuración */}
        <Text style={styles.userNameText}></Text>
        <FlatList
          data={filteredCourses} // Usamos los cursos filtrados
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
    color: '#85282f', // Texto rojo
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'red', // Color del borde
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  userNameText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  courseItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#85282f',
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

export default Cursos1;
