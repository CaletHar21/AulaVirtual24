import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native';

const ForumsScreen = ({ navigation }) => {
    const [forums, setForums] = useState([
        { id: '1', title: 'Foro 1: Discusión General', description: 'Participa en conversaciones generales sobre cualquier tema de interés.' },
        { id: '2', title: 'Foro 2: Temas de Salud', description: 'Discute temas relacionados con la salud y comparte consejos con la comunidad.' },
    ]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleNavigateToDetail = (forumId, forumTitle) => {
        navigation.navigate('ForumDetail', { forumId, forumTitle });
    };

    const handleAddForum = () => {
        if (newTitle.trim() && newDescription.trim()) {
            const newForum = {
                id: (forums.length + 1).toString(),
                title: newTitle.trim(),
                description: newDescription.trim(),
            };
            setForums([...forums, newForum]);
            setNewTitle('');
            setNewDescription('');
        } else {
            alert('Por favor, completa ambos campos antes de agregar un nuevo tema.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Foros de Discusión</Text>

            {/* Formulario para agregar nuevo tema */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Título del nuevo foro"
                    value={newTitle}
                    onChangeText={setNewTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción del nuevo foro"
                    value={newDescription}
                    onChangeText={setNewDescription}
                    multiline
                />
                <Button title="Agregar Foro" onPress={handleAddForum} />
            </View>

            {/* Lista de foros */}
            {forums.map((forum) => (
                <TouchableOpacity
                    key={forum.id}
                    style={styles.forumCard}
                    onPress={() => handleNavigateToDetail(forum.id, forum.title)}
                >
                    <Text style={styles.forumTitle}>{forum.title}</Text>
                    <Text style={styles.forumDescription}>{forum.description}</Text>
                </TouchableOpacity>
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
});

export default ForumsScreen;
