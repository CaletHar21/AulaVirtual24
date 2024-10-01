import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cursos from './Cursos';
import MaterialEstudioJava from './MaterialEstudioJava'; // Asegúrate de que esta ruta sea correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cursos">
        <Stack.Screen name="Cursos" component={Cursos} />
        <Stack.Screen name="MaterialEstudioJava" component={MaterialEstudioJava} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
