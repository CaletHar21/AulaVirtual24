import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';  // Importar LinearGradient

const Perfil = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userId, setUserId] = useState(''); // Estado para guardar el ID
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        // Recuperamos los datos desde AsyncStorage
        const name = await AsyncStorage.getItem('userNames');
        const lastName = await AsyncStorage.getItem('userLastNames');
        const email = await AsyncStorage.getItem('userCorreo');
        const phone = await AsyncStorage.getItem('userPhone');
        const id = await AsyncStorage.getItem('userId');  // Recuperamos el ID del usuario

        if (name && lastName) {
          setUserName(name);
          setUserLastName(lastName);
        }

        if (email) {
          setUserEmail(email);
        }

        if (phone) {
          setUserPhone(phone);
        }

        if (id) {
          setUserId(id);  // Guardamos el ID en el estado
        }
      } catch (error) {
        console.error('Error al recuperar los datos desde AsyncStorage', error);
      }
    };

    getUserDataFromStorage();
  }, []); // Solo se ejecuta una vez cuando se monta el componente

  const handleEditProfile = () => {
    setIsEditing(true); // Activamos el modo de edición
  };

  const handleSaveChanges = async () => {
    const userId = await AsyncStorage.getItem('userId');  // Obtener el ID del usuario desde AsyncStorage

    if (!userId) {
      Alert.alert('Error', 'No se encontró el ID del usuario');
      return;
    }

    try {
      // Realizar la solicitud PUT al backend para actualizar los datos
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, {
        correo: userEmail,
        telefono: userPhone, // Incluir teléfono también
      });

      // Verificar la respuesta de la API
      if (response.data.success) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        
        // Actualizar los datos en AsyncStorage
        await AsyncStorage.setItem('userCorreo', userEmail);
        await AsyncStorage.setItem('userPhone', userPhone);

        setIsEditing(false); // Desactivar el modo de edición
      } else {
        Alert.alert('Error', 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al guardar los cambios', error);
      Alert.alert('Error', 'Hubo un problema al guardar los cambios');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
    // Lógica para cerrar sesión (limpiar datos, redirigir a Login, etc.)
  };

  return (
    <LinearGradient
      colors={['#85282f', '#e8ecf9', '#e8ecf9', '#fdfdfd']}  // Colores del gradiente
      style={[styles.container, { height: Dimensions.get('window').height }]}  // Estilo responsivo
    >
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/LoginLogo.png')} // Cambia por la imagen que desees
          style={[styles.profileImage, { tintColor: '#c87075' }]} // Aplica el color tint
        />
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{userName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.value}>{userLastName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Correo:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userEmail}
              onChangeText={setUserEmail}
            />
          ) : (
            <Text style={styles.value}>{userEmail}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Teléfono:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userPhone}
              onChangeText={setUserPhone}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{userPhone}</Text>
          )}
        </View>
      </View>

      {/* Mostrar botón de edición o guardado dependiendo del estado */}
      {!isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,  // Espacio entre la imagen y el resto del contenido
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,  // Esto hace que la imagen sea redonda
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileHeader: {
    alignItems: 'flex-start',
    marginBottom: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#c87075',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Perfil;
