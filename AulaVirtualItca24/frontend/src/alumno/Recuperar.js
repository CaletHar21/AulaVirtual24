import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';  // Importa el LinearGradient

const Recuperar = ({ navigation }) => {
    const [username, setUsername] = useState('');  // Para capturar el nombre de usuario
    const [newPassword, setNewPassword] = useState('');  // Para capturar la nueva contraseña
    const [isUserVerified, setIsUserVerified] = useState(false);  // Estado para verificar usuario
    const [message, setMessage] = useState('');  // Estado para mostrar mensajes
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);  // Estado para saber si la contraseña fue cambiada

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
        // Validamos que el campo de nueva contraseña no esté vacío
        if (!newPassword) {
            setMessage('Por favor, ingresa una nueva contraseña para continuar.');  // Mensaje de error si el campo está vacío
            return;  // No continuar con la recuperación si no se ha ingresado una nueva contraseña
        }

        if (!isUserVerified) {
            setMessage('Por favor, verifica el usuario primero.');  // Establece el mensaje en el estado
            return;
        }

        try {
            // Realizar la solicitud para cambiar la contraseña
            const response = await axios.post('http://localhost:5000/api/cambiar-contrasena', { username, newPassword });

            if (response.data.success) {  // Verifica que el servidor haya indicado éxito
                setMessage(response.data.message);  // Establece el mensaje de éxito en el estado
                setIsPasswordChanged(true);  // Actualiza el estado de contraseña cambiada
            } else {
                setMessage(response.data.message || 'No se pudo recuperar la contraseña');  // Establece un mensaje de error si no se puede cambiar la contraseña
            }
        } catch (error) {
            console.error(error);  // Imprime el error si ocurre alguno
            setMessage('No se pudo recuperar la contraseña');  // Establece un mensaje de error
        }
    };

    // Obtener el ancho y alto de la pantalla
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <LinearGradient
            colors={['#85282f', '#e8ecf9', '#e8ecf9', '#fdfdfd']}  // Los colores del gradiente
            style={[styles.container, { height: screenHeight }]}  // Estilo responsivo para llenar toda la pantalla
        >
            <Text style={styles.headerText}>Restablecer la Contraseña</Text>
            <View style={styles.innerContainer}>
                {/* Mostrar el mensaje de éxito o error aquí */}
                {message && <Text style={styles.message}>{message}</Text>}

                {/* Mostrar el campo de nombre de usuario y el botón para verificar solo si el usuario no ha sido verificado */}
                {!isUserVerified && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <Pressable 
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
                            onPress={handleVerifyUser}
                        >
                            <Text style={styles.buttonText}>Verificar Usuario</Text>
                        </Pressable>
                    </>
                )}

                {/* Mostrar los campos para la nueva contraseña solo si el usuario fue verificado y no ha cambiado la contraseña */}
                {isUserVerified && !isPasswordChanged && (
                    <>
                        <View style={styles.campoUsuario}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nueva contraseña"
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                        </View>

                        <Pressable 
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
                            onPress={handleRecover}
                        >
                            <Text style={styles.buttonText}>Recuperar Contraseña</Text>
                        </Pressable>

                        {/* Agregar espacio adicional entre los botones */}
                        <View style={styles.buttonSpacing}>
                            <Pressable 
                                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
                                onPress={() => {
                                    navigation.replace('Login'); // Redirige a Login cuando se presiona
                                }}
                            >
                                <Text style={styles.buttonText}>Ir a Login</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '80%',
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',  // Hace que el input ocupe el 100% de la pantalla
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        color: '#85282f',  
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonSpacing: {
        marginTop: 20,  // Espacio entre los botones
    },
    campoUsuario: {
        marginTop: 10,
    },
    button: {
        backgroundColor: '#c87075',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 20,
        alignItems: 'center',
        elevation: 5,
    },
    buttonPressed: {
        opacity: 0.7,  // Efecto visual al presionar
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Estilo para el texto "Restablecer la Contraseña"
    headerText: {
        fontSize: 24,  // Aumentamos el tamaño de la fuente
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,  // Espacio debajo del texto
        color: '#333',  // Color oscuro para contraste
    },
});

export default Recuperar;
