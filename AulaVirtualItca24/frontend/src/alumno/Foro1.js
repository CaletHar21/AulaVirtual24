import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

// Ruta para obtener todos los foros
const ForumsScreen = ({ navigation }) => {
    const [forums, setForums] = useState([]);

    const cursoId = "672b87629d6b2e0b61357990";
    const usuarioId = "672015ce049936826673b5eb";

    useEffect(() => {
        fetchForums();
    }, []);

    const fetchForums = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/foros');
            if (!response.ok) throw new Error('Error al obtener los foros.');
            const data = await response.json();
            setForums(data);
        } catch (error) {
            console.error('Error al obtener los foros:', error);
            Alert.alert('Error', 'No se pudieron cargar los foros. Inténtalo de nuevo.');
        }
    };

    const handleDeleteForum = async (forumId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/foros/${forumId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar el foro.');
            fetchForums();
            Alert.alert('Éxito', 'Foro eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el foro:', error);
            Alert.alert('Error', 'No se pudo eliminar el foro. Inténtalo de nuevo.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Foros de Discusión</Text>

            {/* Mostrar los foros */}
            {forums.map((forum) => (
                <View key={forum._id} style={styles.forumCard}>
                    <View style={styles.forumContent}>
                        <Text style={styles.forumTitle}>{forum.titulo}</Text>
                        <Text style={styles.forumDescription}>{forum.comentario}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* Solo mostramos el botón de eliminar */}
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteForum(forum._id)}
                        >
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
    },
    forumCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forumContent: {
        flex: 1,
    },
    forumTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0052cc',
        marginBottom: 5,
    },
    forumDescription: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ForumsScreen;
