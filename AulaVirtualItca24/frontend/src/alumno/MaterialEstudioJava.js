import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Alert, CheckBox } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const studyMaterial = [
  { id: '1', title: 'Introducción a JavaScript', url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', type: 'video' },
  { id: '2', title: 'Funciones en JavaScript', url: 'https://www.youtube.com/watch?v=krI_T9r2t3k', type: 'video' },
  { id: '3', title: 'JavaScript Avanzado', url: 'https://www.youtube.com/watch?v=EUMZm80Pr8U', type: 'video' },
  { id: '4', title: 'Material en PDF', url: 'https://example.com/sample.pdf', type: 'pdf' },
];

const MaterialEstudioJava = ({ navigation }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [timer, setTimer] = useState(0);

  // Cargar el tiempo guardado desde AsyncStorage cuando se monta el componente
  useEffect(() => {
    const getStoredTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('studyTime');
        if (storedTime !== null) {
          setTimer(parseInt(storedTime)); // Recuperamos el tiempo guardado
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
      storeTime(); // Guardar el tiempo cuando el componente se desmonte
    };
  }, []);

  // Guardar el tiempo en AsyncStorage
  const storeTime = async () => {
    try {
      await AsyncStorage.setItem('studyTime', timer.toString());
    } catch (error) {
      console.error('Error al guardar el tiempo:', error);
    }
  };

  const openLink = async (item) => {
    if (item.type === 'pdf') {
      try {
        Alert.alert('Descarga', 'La descarga del archivo PDF ha comenzado');
        
        const downloadResumable = FileSystem.createDownloadResumable(
          item.url,
          FileSystem.documentDirectory + `${item.title}.pdf`
        );
        
        const { uri } = await downloadResumable.downloadAsync();
        
        Alert.alert('Descarga completa', `Archivo descargado en: ${uri}`);
      } catch (error) {
        console.error('Error al descargar el PDF:', error);
        Alert.alert('Error', 'No se pudo descargar el archivo PDF');
      }
    } else {
      Linking.openURL(item.url)
        .catch(err => {
          console.error('Error al abrir el enlace:', err);
          Alert.alert('Error', 'No se pudo abrir el enlace');
        });
    }
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
      <TouchableOpacity onPress={() => openLink(item)} style={styles.materialContent}>
        <Text style={styles.materialTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#3b5998', '#fdfdfd', '#fdfdfd']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.timer}>{`Tiempo: ${timer}s`}</Text>
        <Text style={styles.title}>Material de Estudio - JavaScript</Text>
        <FlatList
          data={studyMaterial}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => {
            navigation.navigate('QuizJava');
            toggleCheck('quiz');
          }}
        >
          <Text style={styles.quizButtonText}>Quiz</Text>
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

export default MaterialEstudioJava;
