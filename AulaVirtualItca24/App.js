import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
 
// pantallas
import Login from './frontend/src/alumno/Login';
import Registro from './frontend/src/alumno/Registro';
import Cursos from './frontend/src/alumno/Cursos';
import MaterialEstudioJava from './frontend/src/alumno/MaterialEstudioJava';
import MaterialEstudioReactNative from './frontend/src/alumno/MaterialEstudioReactNative';
import MaterialEstudioUXUI from './frontend/src/alumno/MaterialEstudioUXUI';
import Home from './frontend/src/alumno/Home';
import ForumsScreen from './frontend/src/alumno/ForumsScreen';
import Calendario from './frontend/src/alumno/Calendario';
import QuizJava from './frontend/src/alumno/QuizJava';
import MaterialEstudioMate from './frontend/src/alumno/MaterialEstudioMate';


 
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
// Estilos generales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  tabIconContainer: {
    borderRadius: 12,
    padding: 4,
  },
});
 
// navegacion de las TABS
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, color: 'red' },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              ...styles.tabIconContainer,
              borderWidth: focused ? 2 : 0,
              borderColor: 'black',
            }}>
              <Icon name="home" size={24} color="red" />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={Cursos}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              ...styles.tabIconContainer,
              borderWidth: focused ? 2 : 0,
              borderColor: 'black',
            }}>
              <Icon name="list" size={24} color="red" />
            </View>
          )
        }}
      />
       <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              ...styles.tabIconContainer,
              borderWidth: focused ? 2 : 0,
              borderColor: 'black',
            }}>
              <Icon name="calendar-today" size={24} color="red" />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};
 
// Componente principal, el hom lo cambio por home TABS eso es para que el TABS quede despues del menu
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="HomeTabs" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="MaterialEstudioJava" component={MaterialEstudioJava} />
        <Stack.Screen name="MaterialEstudioReactNative" component={MaterialEstudioReactNative} />
       <Stack.Screen name="MaterialEstudioUXUI" component={MaterialEstudioUXUI} />
       <Stack.Screen name="QuizJava" component={QuizJava} />
       <Stack.Screen name="MaterialEstudioMate" component={MaterialEstudioMate} />             
        <Stack.Screen name="Foro" component={ForumsScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;
 