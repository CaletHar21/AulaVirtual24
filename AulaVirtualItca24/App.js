import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './frontend/src/alumno/Login';
import Registro from './frontend/src/alumno/Registro';
import Cursos from './frontend/src/alumno/Cursos';
import MaterialEstudioJava from './frontend/src/alumno/MaterialEstudioJava';
import MaterialEstudioReactNative from './frontend/src/alumno/MaterialEstudioReactNative';
import MaterialEstudioUXUI from './frontend/src/alumno/MaterialEstudioUXUI';
import Home from './frontend/src/alumno/Home';
import ForumsScreen from './frontend/src/alumno/ForumsScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cursos" component={Cursos} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="HomeScreen" component={Home}/>
        <Stack.Screen name="MaterialEstudioJava" component={MaterialEstudioJava} />
        <Stack.Screen name="MaterialEstudioReactNative" component={MaterialEstudioReactNative} />
        <Stack.Screen name="MaterialEstudioUXUI" component={MaterialEstudioUXUI} />
        <Stack.Screen name="Foro" component={ForumsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
