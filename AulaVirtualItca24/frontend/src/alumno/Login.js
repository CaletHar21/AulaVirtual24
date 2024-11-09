import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importamos AsyncStorage

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const credentials = { username, password };

    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      console.log('Respuesta del servidor:', response.data);

      // Verificar que la respuesta contiene 'message', 'rol', 'nombres', y 'apellidos'
      if (response.data && response.data.message === true && response.data.rol !== undefined) {
        // Guardamos el rol, nombres y apellidos en AsyncStorage
        console.log('Usuario logueado con rol:', response.data.rol);
        await AsyncStorage.setItem('userRole', response.data.rol.toString()); // Guardamos el rol
        await AsyncStorage.setItem('userNames', response.data.nombres); // Guardamos el nombre
        await AsyncStorage.setItem('userLastNames', response.data.apellidos); // Guardamos los apellidos

        // Navegar al HomeTabs si el login fue exitoso
        navigation.navigate('HomeTabs');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        Alert.alert('Error', `Error del servidor: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        Alert.alert('Error', 'No se recibió respuesta del servidor.');
      } else {
        console.error('Error en la configuración de Axios:', error.message);
        Alert.alert('Error', `Error: ${error.message}`);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#85282f', '#873b41', '#e8ecf9', '#fdfdfd']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require('../../../assets/logoitca.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Recuperar')}>
          <Text style={styles.registerText}>Olvidé mi Contraseña</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

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
    alignItems: 'center',
  },
  logo: {
    width: 475, // Ajusta el tamaño según sea necesario
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f2d7d5',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  button: {
    backgroundColor: '#c87075',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 50,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    color: '#4c669f',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
