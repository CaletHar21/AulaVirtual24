import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Asegúrate de tener acceso a la navegación

  const handleLogin = async () => {
    // Obtener el usuario guardado
    const userString = await AsyncStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    // Verificar credenciales
    if (user && user.username === username && user.password === password) {
      console.log("Inicio de sesión exitoso");
      navigation.navigate('HomeScreen'); // Navegar a la pantalla de Cursos
    } else {
      console.log("Usuario o contraseña incorrectos");
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };
  return (
    <LinearGradient
      colors={['#85282f', '#873b41', '#e8ecf9', '#fdfdfd']} // Colores del gradiente
      style={styles.container}  >
      <View style={styles.innerContainer}>
        {/* Imagen de login centrada */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/LoginLogo.png')}
            style={[styles.logo, { tintColor: '#f2d7d5' }]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}  />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>        
        <TouchableOpacity onPress={() => navigation.navigate('Recuperar')}>
          <Text style={styles.registerText}>Olvide mi Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

export default Login;
