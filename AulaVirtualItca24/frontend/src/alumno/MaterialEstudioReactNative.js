import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Alert, CheckBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Datos de ejemplo para el material de estudio del curso de React Native
const studyMaterial = [
  { id: '1', title: 'Introducción a React Native', url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc' },
  { id: '2', title: 'Componentes y Props en React Native', url: 'https://www.youtube.com/watch?v=U7-gakPFVBM' },
  { id: '3', title: 'Navegación en React Native', url: 'https://www.youtube.com/watch?v=F27zJjORJy4' },
  { id: '4', title: 'Hooks en React Native', url: 'https://www.youtube.com/watch?v=4pO-HcG2igk' },
  { id: '5', title: 'State Management con Redux en React Native', url: 'https://www.youtube.com/watch?v=93p3LxR9xfM' },
];

const MaterialEstudioReactNative = ({ navigation }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [timer, setTimer] = useState(0);

  // Cargar el tiempo guardado desde AsyncStorage cuando se monta el componente
  useEffect(() => {
    const getStoredTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('studyTimeReactNative');
        if (storedTime !== null) {
          setTimer(parseInt(storedTime));
        }
      } catch (error) {
        console.error('Error al recuperar el tiempo:', error);
      }
    };

    getStoredTime();

    // Inicia el temporizador
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => {
      clearInterval(interval);
      storeTime();
    };
  }, []);

  // Guardar el tiempo en AsyncStorage
  const storeTime = async () => {
    try {
      await AsyncStorage.setItem('studyTimeReactNative', timer.toString());
    } catch (error) {
      console.error('Error al guardar el tiempo:', error);
    }
  };

  // Función para abrir enlaces de YouTube
  const openLink = async (url) => {
    Linking.openURL(url)
      .catch(err => {
        console.error('Error al abrir el enlace:', err);
        Alert.alert('Error', 'No se pudo abrir el enlace');
      });
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Renderizar cada elemento del material de estudio
  const renderItem = ({ item }) => (
    <View style={styles.materialItem}>
      <CheckBox
        value={checkedItems[item.id] || false}
        onValueChange={() => toggleCheck(item.id)}
      />
      <TouchableOpacity style={styles.materialContent} onPress={() => openLink(item.url)}>
        <Text style={styles.materialTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#61dafb', '#fdfdfd', '#fdfdfd']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.timer}>{`Tiempo: ${timer}s`}</Text>
        <Text style={styles.title}>Material de Estudio - React Native</Text>
        <FlatList
          data={studyMaterial}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => {
            navigation.navigate('QuizNative');
            toggleCheck('quiz');
          }}
        >
          <Text style={styles.quizButtonText}>Quiz</Text>
        </TouchableOpacity>
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
  timer: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  materialContent: {
    flex: 1,
    marginLeft: 8,
  },
  materialTitle: {
    fontSize: 18,
    color: '#333',  
  },
  quizButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff7f50',
    borderRadius: 10,
    alignItems: 'center',
  },
  quizButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MaterialEstudioReactNative;
