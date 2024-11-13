import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

const ProgresoMaterias = () => {
  const [quizJavaScore, setQuizJavaScore] = useState(null);
  const [quizMateScore, setQuizMateScore] = useState(null);
  const [quizUxScore, setQuizUxScore] = useState(null);
  const [quizNativeScore, setQuizNativeScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const javaScore = await AsyncStorage.getItem('quizJavaScore');
        const mateScore = await AsyncStorage.getItem('quizMateScore');
        const uxScore = await AsyncStorage.getItem('quizUxScore');
        const nativeScore = await AsyncStorage.getItem('quizNativeScore');

        const scores = [
          javaScore !== null ? parseFloat(javaScore) : null,
          mateScore !== null ? parseFloat(mateScore) : null,
          uxScore !== null ? parseFloat(uxScore) : null,
          nativeScore !== null ? parseFloat(nativeScore) : null,
        ];

        setQuizJavaScore(scores[0]);
        setQuizMateScore(scores[1]);
        setQuizUxScore(scores[2]);
        setQuizNativeScore(scores[3]);

        // Calcula el promedio global
        const validScores = scores.filter(score => score !== null);
        const total = validScores.reduce((sum, score) => sum + score, 0);
        const average = validScores.length > 0 ? total / validScores.length : null;
        setAverageScore(average);
      } catch (error) {
        console.error('Error al cargar las notas:', error);
      }
    };

    loadScores();
  }, []);

  const renderScore = (label, score, iconName, color) => (
    <View style={styles.scoreContainer}>
      <FontAwesome5 name={iconName} size={24} color={color} />
      <Text style={styles.scoreText}>{label}: {score !== null ? score.toFixed(1) : 'No disponible'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso en los Quizzes</Text>
      
      {renderScore("Quiz Java", quizJavaScore, "java", "#f89820")}
      {renderScore("Quiz Mate", quizMateScore, "calculator", "#4CAF50")}
      {renderScore("Quiz UX", quizUxScore, "paint-brush", "#00BCD4")}
      {renderScore("Quiz Native", quizNativeScore, "mobile-alt", "#FF9800")}
      
      <View style={styles.averageContainer}>
        <Text style={styles.averageText}>
          Tu Nota Global de Ciclo es: {averageScore !== null ? averageScore.toFixed(1) : 'No disponible'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'red',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    color: 'yellow',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  averageContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  averageText: {
    fontSize: 26,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProgresoMaterias;
