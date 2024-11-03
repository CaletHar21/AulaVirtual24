import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
 
const questions = [
  { question: 'Java es un lenguaje de programación orientado a objetos.', answer: true },
  { question: 'Java fue desarrollado por Microsoft.', answer: false },
  { question: 'La sintaxis de Java es similar a la de C++.', answer: true },
  { question: 'Java no tiene recolección de basura.', answer: false },
  { question: 'Java se ejecuta en una máquina virtual.', answer: true },
  { question: 'El archivo de clase en Java tiene extensión .class.', answer: true },
  { question: 'Java puede ser utilizado para desarrollar aplicaciones web.', answer: true },
  { question: 'En Java, la palabra clave "static" permite crear métodos de instancia.', answer: false },
  { question: 'Java es un lenguaje compilado.', answer: false },
  { question: 'Java soporta múltiples herencias a través de interfaces.', answer: true },
];
 
const QuizJava = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
 
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };
 
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };
 
  return (
    <View style={styles.container}>
      {quizFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Tu puntuación es: {score} de {questions.length}</Text>
          <Button title="Reiniciar Quiz" onPress={resetQuiz} />
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Verdadero" onPress={() => handleAnswer(true)} />
            <Button title="Falso" onPress={() => handleAnswer(false)} />
          </View>
        </View>
      )}
    </View>
  );
};
 
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
 
export default QuizJava;