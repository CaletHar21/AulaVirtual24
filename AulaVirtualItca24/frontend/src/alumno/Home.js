import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const options = [
  { id: 1, title: 'Cursos', img: require('../../../assets/cursos.png') },
  { id: 2, title: 'Foro', img: require('../../../assets/foro.png') },
  { id: 3, title: 'Opción 3', img: require('../../../assets/LoginLogo.png') },
  { id: 4, title: 'Opción 4', img: require('../../../assets/LoginLogo.png') },
  { id: 5, title: 'Opción 5', img: require('../../../assets/LoginLogo.png') },
  { id: 6, title: 'Opción 6', img: require('../../../assets/LoginLogo.png') },
];

const Home = () => {
  const navigation = useNavigation();

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        if (item.title === 'Cursos') {
          navigation.navigate('Cursos'); // Navega a la pantalla de Cursos
        }
        if(item.title==='Foro'){
            navigation.navigate('Foro');
        }
      }}
    >
      <Image source={item.img} style={styles.image} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido!</Text>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    height: 200,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default Home;
