import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejemplo para el material de estudio del curso de Diseño UX/UI
const studyMaterial = [
  { id: '1', title: 'Introducción al Diseño UX/UI', url: 'https://www.youtube.com/watch?v=Ovj4hFxko7c' },
  { id: '2', title: 'Principios de Usabilidad', url: 'https://www.youtube.com/watch?v=rb90Tfo7JoA' },
  { id: '3', title: 'Diseño de Interfaces Responsivas', url: 'https://www.youtube.com/watch?v=QjEqxRi-vSM' },
  // Agrega más enlaces aquí
];

const MaterialEstudioUXUI = () => {
  // Función para abrir enlaces de YouTube
  const openLink = (url) => {
    Linking.openURL(url)
      .catch(err => {
        console.error('Error al abrir el enlace:', err);
        Alert.alert('Error', 'No se pudo abrir el enlace');
      });
  };

  // Renderizar cada elemento del material de estudio
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.materialItem} onPress={() => openLink(item.url)}>
      <Text style={styles.materialTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#3b5998', '#fdfdfd', '#fdfdfd']}  // Colores del gradiente
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Material de Estudio - Diseño UX/UI</Text>
        <FlatList
          data={studyMaterial}
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
  materialItem: {
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
  materialTitle: {
    fontSize: 18,
    color: '#333',  
  },
});

export default MaterialEstudioUXUI;
