import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizMate = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    { id: 1, question: 'La derivada de sin(x) es cos(x).', type: 'true/false', correctAnswer: 'true' },
    { id: 2, question: 'La integral de e^x es x*e^(x).', type: 'true/false', correctAnswer: 'false' },
    { id: 3, question: '¿Cuál de las siguientes es la serie de Taylor de e^x?', options: ['1 + x + x^2/2 + x^3/6 + ...', 'x + x^2/2 + x^3/3 + ...', '1 - x + x^2 - x^3 + ...'], type: 'multiple', correctAnswer: '1 + x + x^2/2 + x^3/6 + ...' },
    { id: 4, question: 'Completa: La derivada de ln(x) es ___.', type: 'fill-in', correctAnswer: '1/x' },
    { id: 5, question: 'Arrastra el número correcto para la integral de x^2 dx:', type: 'drag', correctAnswer: 'x^3/3' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !quizCompleted) {
        setTimeLeft(prevTime => prevTime - 1);
      } else {
        clearInterval(timer);
        if (!quizCompleted) calculateScore();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
    setSelectedAnswer(answer);
  };

  const calculateScore = () => {
    let totalScore = 0;

    questions.forEach(question => {
      if (question.type === 'true/false' && answers[question.id] === question.correctAnswer) {
        totalScore++;
      } else if (question.type === 'multiple' && answers[question.id] === question.correctAnswer) {
        totalScore++;
      } else if (question.type === 'fill-in' && answers[question.id]?.toLowerCase() === question.correctAnswer.toLowerCase()) {
        totalScore++;
      } else if (question.type === 'drag' && answers[question.id] === question.correctAnswer) {
        totalScore++;
      }
    });

    const scoreOutOf10 = (totalScore / questions.length) * 10;
    setScore(scoreOutOf10);
    setQuizCompleted(true);
    saveScore(scoreOutOf10);
  };

  const saveScore = async (score) => {
    try {
      await AsyncStorage.setItem('quizScore', score.toString());
      Alert.alert('Nota guardada', `Tu nota es: ${score.toFixed(1)}`);
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderAnswerButton = (answer, questionId) => {
    const isSelected = selectedAnswer === answer;
    return (
      <TouchableOpacity
        onPress={() => handleAnswerChange(questionId, answer)}
        style={[styles.answerButton, isSelected && styles.selectedAnswer]}
      >
        <Text style={styles.answerText}>{answer}</Text>
      </TouchableOpacity>
    );
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 'true/false') {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {['true', 'false'].map(answer => renderAnswerButton(answer, currentQuestion.id))}
        </View>
      );
    } else if (currentQuestion.type === 'multiple') {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.options.map(option => renderAnswerButton(option, currentQuestion.id))}
        </View>
      );
    } else if (currentQuestion.type === 'fill-in') {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => handleAnswerChange(currentQuestion.id, text)}
            value={answers[currentQuestion.id] || ''}
          />
        </View>
      );
    } else if (currentQuestion.type === 'drag') {
      // Implementar la pregunta de arrastre aquí
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const showSummary = () => {
    return questions.map((question) => {
      const correct = question.correctAnswer;
      const userAnswer = answers[question.id];
      return (
        <View key={question.id} style={styles.summaryItem}>
          <Text style={styles.summaryText}>
            {question.question}
            {'\n'}
            Respuesta correcta: {correct}
            {'\n'}
            Tu respuesta: {userAnswer || 'No respondida'}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Tiempo restante: {formatTime(timeLeft)}</Text>

      {quizCompleted ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Resumen de respuestas</Text>
          {showSummary()}
          <Text style={styles.scoreText}>TU NOTA ES: {score.toFixed(1)}</Text>
        </View>
      ) : (
        <View>
          {renderQuestion()}

          <View style={styles.navigationButtons}>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity onPress={previousQuestion} style={styles.navButton}>
                <Text style={styles.navButtonText}>Anterior</Text>
              </TouchableOpacity>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <TouchableOpacity onPress={nextQuestion} style={styles.navButton}>
                <Text style={styles.navButtonText}>Siguiente</Text>
              </TouchableOpacity>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <Button title="Finalizar Quiz" onPress={calculateScore} />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAnswer: {
    backgroundColor: 'yellow',
    shadowColor: 'yellow',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.7,
    elevation: 5,
  },
  answerText: {
    color: 'black',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white',
    marginVertical: 10,
    fontSize: 18,
  },
  timerText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 40,
    color: 'yellow',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 20,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 10,
  },
  summaryTitle: {
    fontSize: 20,
    color: 'red',
    marginBottom: 10,
  },
  summaryItem: {
    marginBottom: 10,
  },
  summaryText: {
    color: 'white',
    fontSize: 16,
  },
});

export default QuizMate;
