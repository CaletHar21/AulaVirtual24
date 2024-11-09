import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = () => {
  // Ejemplo de datos del usuario
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    profileImage: require('../../../assets/react.png'), // Imagen de perfil (colócala en tu carpeta de assets)
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Aquí podrás editar tu perfil. Este solo es ejmeplo');
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que quieres cerrar sesión?');
    // Aquí puedes agregar la lógica para cerrar sesión (limpiar datos, redirigir a Login, etc.)
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
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

export default ProfileScreen;
