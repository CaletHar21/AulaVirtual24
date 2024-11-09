import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage para persistir el rol

const options = [
  { id: 1, title: 'Cursos', img: require('../../../assets/cursos.png') },
  { id: 2, title: 'Foro', img: require('../../../assets/foro.png') },
  { id: 3, title: 'Opción 3', img: require('../../../assets/LoginLogo.png') },
  { id: 4, title: 'Opción 4', img: require('../../../assets/LoginLogo.png') },
  { id: 5, title: 'Opción 5', img: require('../../../assets/LoginLogo.png') },
  { id: 6, title: 'Opción 6', img: require('../../../assets/LoginLogo.png') },
];

const Home = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Para guardar el rol del usuario
  const [userNames, setUserNames] = useState(''); // Para guardar el nombre del usuario
  const [userLastNames, setUserLastNames] = useState(''); // Para guardar los apellidos

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        // Recuperamos el rol, nombres y apellidos desde AsyncStorage
        const role = await AsyncStorage.getItem('userRole');
        const names = await AsyncStorage.getItem('userNames');
        const lastNames = await AsyncStorage.getItem('userLastNames');

        if (role) {
          setUserRole(Number(role)); // Aseguramos que el rol sea un número
        }
        if (names && lastNames) {
          setUserNames(names); // Establecemos el nombre
          setUserLastNames(lastNames); // Establecemos los apellidos
        }
      } catch (error) {
        console.error('Error al recuperar los datos desde AsyncStorage', error);
      }
    };

    getUserDataFromStorage();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar entre mostrar y ocultar el menú
  };

  const handleMenuOption = (option) => {
    if (option === 'Perfil') {
      navigation.navigate('Perfil');
    } else if (option === 'AgregarUsario') {
      navigation.navigate('Registro');
    } else if (option === 'Cerrar sesión') {
      // Aquí iría la lógica para cerrar sesión
      navigation.navigate('Login'); // Ejemplo de redirección a la pantalla de Login
    }
    setIsMenuOpen(false); // Cerrar el menú después de seleccionar una opción
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        if (item.title === 'Cursos') {
          navigation.navigate('Cursos');
        }
        if (item.title === 'Foro') {
          navigation.navigate('Foro');
        }
      }}
    >
      <Image source={item.img} style={styles.image} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón del menú desplegable en la esquina superior derecha */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuText}>☰</Text> {/* Símbolo de menú */}
      </TouchableOpacity>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('Perfil')}>
            <Text style={styles.menuItemText}>Perfil</Text>
          </TouchableOpacity>
          {/* Aquí se agrega la opción de "Configuración" solo si el rol es 1 */}
          {userRole === 1 && (
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('AgregarUsario')}>
              <Text style={styles.menuItemText}>Agregar usuario</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption('Cerrar sesión')}>
            <Text style={styles.menuItemText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Mostrar el nombre y apellido del usuario en el mensaje de bienvenida */}
      <Text style={styles.welcome}>¡Bienvenido, {userNames} {userLastNames}!</Text>

      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    height: 200,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
  },
  // Estilo del botón del menú en la parte superior derecha
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#c87075',
    borderRadius: 50,
    zIndex: 10,  // Asegura que el botón siempre esté al frente
  },
  menuText: {
    fontSize: 24,
    color: '#fff',
  },
  // Estilos del menú desplegable
  dropdownMenu: {
    position: 'absolute',
    top: 60, // Asegúrate de que esté debajo del botón
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10, // Elevación mayor para que esté por encima
    padding: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100, // Asegura que el menú se muestre por encima de otros elementos
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Home;
