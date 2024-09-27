import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const handleLogin = () => {
// Aquí se debe agregar la lógica para el manejo del login
console.log("Username:", username, "Password:", password);
};
return (
<View style={styles.container}>
<Text style={styles.title}>Iniciar Sesión</Text>
<TextInput
style={styles.input}
placeholder="Nombre de usuario"
value={username}
onChangeText={setUsername}
/>
<TextInput
style={styles.input}
placeholder="Contraseña"
value={password}
onChangeText={setPassword}
secureTextEntry
/>
<Button title="Ingresar" onPress={handleLogin} />
</View>
);
};
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
paddingHorizontal: 20,
},
title: {
fontSize: 24,
marginBottom: 20,
textAlign: 'center',
},
input: {
height: 40,
borderColor: 'gray',
borderWidth: 1,
marginBottom: 20,
paddingHorizontal: 10,
},
});
export default Login;
