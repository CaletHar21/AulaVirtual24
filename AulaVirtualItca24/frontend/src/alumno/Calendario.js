import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
 
const Calendario = () => {
  const today = new Date().toISOString().split('T')[0]; // con esto agarramos la fecha actual en la que estamos vichos
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALENDARIO</Text>
      <Calendar
        // Establece la fecha actual como seleccionada
        current={today}
        // Puedes manejar la selección de fechas aquí
        onDayPress={(day) => {
          console.log('Fecha seleccionada: ', day);
        }}
        // Personaliza los días seleccionados o marcados si lo deseas
        markedDates={{
          [today]: { selected: true, marked: true, selectedColor: 'red' },
        }}
      />
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
});
 
export default Calendario;
