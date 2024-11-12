import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Alert, CheckBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Datos de ejemplo para el material de estudio del curso de Diseño UX/UI
const studyMaterial = [
  { id: '1', title: 'Introducción al Diseño UX/UI', url: 'https://www.youtube.com/watch?v=Ovj4hFxko7c' },
  { id: '2', title: 'Principios de Usabilidad', url: 'https://www.youtube.com/watch?v=rb90Tfo7JoA' },
  { id: '3', title: 'Diseño de Interfaces Responsivas', url: 'https://www.youtube.com/watch?v=QjEqxRi-vSM' },
  // Agrega más enlaces aquí
];

const MaterialEstudioUXUI = ({ navigation }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const getStoredTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('studyTimeUXUI');
        if (storedTime !== null) {
          setTimer(parseInt(storedTime));
        }
      } catch (error) {
        console.error('Error al recuperar el tiempo:', error);
      }
    };

    getStoredTime();

    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => {
      clearInterval(interval);
      storeTime();
    };
  }, []);

  const storeTime = async () => {
    try {
      await AsyncStorage.setItem('studyTimeUXUI', timer.toString());
    } catch (error) {
      console.error('Error al guardar el tiempo:', error);
    }
  };

  const openLink = (url) => {
    Linking.openURL(url)
      .catch(err => {
        console.error('Error al abrir el enlace:', err);
        Alert.alert('Error', 'No se pudo abrir el enlace');
      });
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
      colors={['#3b5998', '#fdfdfd', '#fdfdfd']}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.timer}>{`Tiempo: ${timer}s`}</Text>
        <Text style={styles.title}>Material de Estudio - Diseño UX/UI</Text>
        <FlatList
          data={studyMaterial}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('QuizUx')}
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

export default MaterialEstudioUXUI;
