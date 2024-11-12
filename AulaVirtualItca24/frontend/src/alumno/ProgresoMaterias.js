import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgresoMaterias = () => {
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    const getStoredTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('studyTime');
        if (storedTime !== null) {
          setStudyTime(parseInt(storedTime)); // Recuperamos el tiempo guardado
        }
      } catch (error) {
        console.error('Error al recuperar el tiempo:', error);
      }
    };

    getStoredTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progreso de Materias</Text>
      <Text style={styles.time}>Tiempo acumulado: {studyTime}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default ProgresoMaterias;
