// frontend/src/alumno/Recuperar.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Recuperar = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isUserVerified, setIsUserVerified] = useState(false); // Estado para verificar usuario
    const [message, setMessage] = useState('');  // Estado para el mensaje de éxito o error

    // Verificar si el usuario existe en la base de datos
    const handleVerifyUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verificar-usuario', { username });
            setMessage(response.data.message);  // Establece el mensaje en el estado
            setIsUserVerified(true);  // Si el usuario existe, permitir cambiar la contraseña
        } catch (error) {
            console.error(error);  // Verificamos el error en la consola
            setMessage('Usuario no encontrado');  // Establece el mensaje en el estado
            setIsUserVerified(false);  // Si el usuario no existe, no permitir el cambio
        }
    };

    // Recuperar o cambiar la contraseña
    const handleRecover = async () => {
        if (!isUserVerified) {
            setMessage('Por favor, verifica el usuario primero.');  // Establece el mensaje en el estado
            return;
        }

        try {
            // Realizar la solicitud para cambiar la contraseña
            const response = await axios.post('http://localhost:5000/api/cambiar-contrasena', { username, newPassword });

            console.log(response.data);  // Imprime la respuesta para depurar

            if (response.data.success) {  // Verifica que el servidor haya indicado éxito
                setMessage(response.data.message);  // Establece el mensaje de éxito en el estado
                
                // Después de que la contraseña se actualiza correctamente, "presionar" el botón oculto
                setTimeout(() => {
                    document.getElementById("hidden-button").click();
                }, 1000);  // Esperamos 1 segundo para mostrar el mensaje antes de redirigir
            } else {
                setMessage(response.data.message || 'No se pudo recuperar la contraseña');  // Establece un mensaje de error si no se puede cambiar la contraseña
            }
        } catch (error) {
            console.error(error);  // Imprime el error si ocurre alguno
            setMessage('No se pudo recuperar la contraseña');  // Establece un mensaje de error
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <Button title="Verificar Usuario" onPress={handleVerifyUser} />

            {isUserVerified && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Nueva contraseña"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Button title="Recuperar Contraseña" onPress={handleRecover} />
                </>
            )}

            {/* Mostrar el mensaje de éxito o error aquí */}
            {message && <Text style={styles.message}>{message}</Text>}

            {/* Botón oculto que se activa programáticamente */}
            <Button
                id="hidden-button"
                title="Ir a Login"
                onPress={() => {
                    console.log('Redirigiendo a Login...');
                    navigation.replace('Login'); // Redirige a Login cuando se presiona
                }}
                style={{ display: 'none' }} // El botón está oculto
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        color: '#007BFF',  // Color azul para el mensaje de éxito
        textAlign: 'center',
    },
});

export default Recuperar;
