import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
 
// Pantallas/vistas
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
import QuizMate from './frontend/src/alumno/QuizMate';
import QuizNative from './frontend/src/alumno/QuizNative';
import MaterialEstudioMate from './frontend/src/alumno/MaterialEstudioMate';
import Recuperar from './frontend/src/alumno/Recuperar'; 
import Perfil from './frontend/src/alumno/Perfil';
import Cursos1 from './frontend/src/alumno/Cursos1';
import QuizUx from './frontend/src/alumno/QuizUx';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 
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

const TabIcon = ({ name, focused }) => (
  <View style={{ ...styles.tabIconContainer, borderWidth: focused ? 2 : 0, borderColor: 'black' }}>
    <Icon name={name} size={24} color={focused ? 'red' : 'gray'} />
  </View>
);

// Navegación de las TABS
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
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cursos"
        component={Cursos}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="list" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="calendar-today" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};
 
const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="MaterialEstudioJava" component={MaterialEstudioJava} />
          <Stack.Screen name="MaterialEstudioReactNative" component={MaterialEstudioReactNative} />
          <Stack.Screen name="MaterialEstudioUXUI" component={MaterialEstudioUXUI} />
          <Stack.Screen name="QuizJava" component={QuizJava} />
          <Stack.Screen name="QuizMate" component={QuizMate} />
          <Stack.Screen name="QuizNative" component={QuizNative}/> 
          <Stack.Screen name="QuizUx" component={QuizUx} />
          <Stack.Screen name="MaterialEstudioMate" component={MaterialEstudioMate} />
          <Stack.Screen name="Foro" component={ForumsScreen} />
          <Stack.Screen name="Recuperar" component={Recuperar} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Cursos1" component={Cursos1} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};
 
export default App;
