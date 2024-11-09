import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const Calendario = () => {
  const today = new Date().toISOString().split('T')[0];
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [newEvent, setNewEvent] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    loadEvents();
  }, []);

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
    if (events[date] && events[date].events.length > 0) {
      Alert.alert('Eventos', events[date].events.join('\n'));
    } else {
      Alert.alert('No hay eventos', 'No hay eventos para esta fecha.');
    }
  };

  const addEvent = async () => {
    if (newEvent.trim() === '') {
      Alert.alert('Error', 'El evento no puede estar vacío.');
      return;
    }

    const updatedEvents = {
      ...events,
      [selectedDate]: {
        selected: true,
        marked: true,
        selectedColor: selectedColor,
        events: [...(events[selectedDate]?.events || []), newEvent],
      },
    };

    setEvents(updatedEvents);
    setNewEvent('');

    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const deleteEvent = async () => {
    if (!events[selectedDate]) {
      Alert.alert('Error', 'No hay eventos para eliminar en esta fecha.');
      return;
    }

    const updatedEvents = { ...events };
    delete updatedEvents[selectedDate];

    setEvents(updatedEvents);

    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error deleting events:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALENDARIO</Text>
      <Calendar
        current={today}
        onDayPress={handleDayPress}
        markedDates={events}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nuevo evento"
          placeholderTextColor="gray"
          value={newEvent}
          onChangeText={setNewEvent}
        />
        <Picker
          selectedValue={selectedColor}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedColor(itemValue)}
        >
          <Picker.Item label="Azul" value="blue" />
          <Picker.Item label="Rojo" value="red" />
          <Picker.Item label="Amarillo" value="yellow" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={addEvent}>
          <Text style={styles.buttonText}>Agregar Evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteEvent}>
          <Text style={styles.buttonText}>Eliminar Evento</Text>
        </TouchableOpacity>
      </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: 150,
    color: 'black',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Calendario;
