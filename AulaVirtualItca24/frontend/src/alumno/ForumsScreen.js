import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';

const ForumsScreen = ({ navigation }) => {
    const [forums, setForums] = useState([]);
    const [newTitulo, setNewTitulo] = useState('');
    const [newComentario, setNewComentario] = useState('');
    const [editingForum, setEditingForum] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

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

    const handleAddOrUpdateForum = async () => {
        if (newTitulo.trim() && newComentario.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/api/foros${editingForum ? `/${editingForum._id}` : ''}`, {
                    method: editingForum ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ titulo: newTitulo.trim(), comentario: newComentario.trim(), cursoId, usuarioId }),
                });

                if (!response.ok) throw new Error('Error al crear o editar el foro.');
                fetchForums();
                setNewTitulo('');
                setNewComentario('');
                setEditingForum(null);
                setShowForm(false); // Ocultar el formulario al agregar o actualizar
                Alert.alert('Éxito', editingForum ? 'Foro editado exitosamente' : 'Foro agregado exitosamente');
            } catch (error) {
                console.error('Error al agregar o editar el foro:', error);
                Alert.alert('Error', 'No se pudo agregar o editar el foro. Inténtalo de nuevo.');
            }
        } else {
            Alert.alert('Aviso', 'Por favor, completa ambos campos antes de agregar o editar un tema.');
        }
    };

    const handleEditForum = (forum) => {
        setNewTitulo(forum.titulo);
        setNewComentario(forum.comentario);
        setEditingForum(forum);
        setShowForm(true); // Mostrar el formulario cuando se edita
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

            <Button
                title={showForm ? "Ocultar Formulario" : "Agregar Foro"}
                onPress={() => setShowForm(!showForm)}
            />

            {showForm && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Título del nuevo foro"
                        value={newTitulo}
                        onChangeText={setNewTitulo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Comentario del nuevo foro"
                        value={newComentario}
                        onChangeText={setNewComentario}
                        multiline
                    />
                    <Button title={editingForum ? "Actualizar Foro" : "Agregar Foro"} onPress={handleAddOrUpdateForum} />
                </View>
            )}

            {forums.map((forum) => (
                <View key={forum._id} style={styles.forumCard}>
                    <View style={styles.forumContent}>
                        <Text style={styles.forumTitle}>{forum.titulo}</Text>
                        <Text style={styles.forumDescription}>{forum.comentario}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={() => handleEditForum(forum)}>
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteForum(forum._id)}>
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
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 3,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
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
    editButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 5,
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
