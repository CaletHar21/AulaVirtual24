// frontend/src/alumno/Recuperar.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Recuperar = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleRecover = () => {
        axios.post('http://172.16.164.125:5000/api/recuperar', { username, newPassword })
            .then(response => {
                Alert.alert('Éxito', response.data.message);
            })
            .catch(error => {
                Alert.alert('Error', 'No se pudo recuperar la contraseña');
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <Button title="Recuperar Contraseña" onPress={handleRecover} />
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
});

export default Recuperar;
