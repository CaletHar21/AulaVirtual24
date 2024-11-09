import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Registro = ({ navigation }) => {
  // Definir los estados para todos los campos
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState(0); // Por defecto, el rol es 0

  const handleRegister = async () => {
    const user = {
      username,
      password,
      nombres,
      apellidos,
      correo,
      telefono,
      rol,
    };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
        navigation.navigate('Login'); // Navegar a la pantalla de Login
      } else {
        const errorData = await response.json();
        console.log('Error en el registro:', errorData.message);
        Alert.alert('Error', errorData.message || 'Hubo un problema con el registro');
      }
    } catch (error) {
      console.log('Error de conexión:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <LinearGradient
      colors={['#9ab1fa', '#e8ecf9', '#fdfdfd']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Registro de Usuario</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            placeholderTextColor="#aaa"
            value={nombres}
            onChangeText={setNombres}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            placeholderTextColor="#aaa"
            value={apellidos}
            onChangeText={setApellidos}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono (opcional)"
            placeholderTextColor="#aaa"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Selección de rol (opcional, puedes predefinirlo) */}
        {/* Para este caso, por simplicidad, mantenemos el rol por defecto 0. Puedes agregar lógica para que el usuario elija un rol si lo deseas. */}
        <View style={styles.inputContainer}>
          <Icon name="cogs" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Rol (0 para usuario normal)"
            placeholderTextColor="#aaa"
            value={rol.toString()}
            onChangeText={(text) => setRol(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1,
  },
  button: {
    backgroundColor: '#4c669f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Registro;
