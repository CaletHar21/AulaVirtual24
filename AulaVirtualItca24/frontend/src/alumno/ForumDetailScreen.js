// ForumDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';

const ForumDetailScreen = ({ route }) => {
    const { forumId } = route.params;
    //hjfd
    
    // Aquí puedes simular un foro con respuestas
    const [responses, setResponses] = useState([]);
    const [responseText, setResponseText] = useState('');

    const handleAddResponse = () => {
        if (responseText.trim()) {
            setResponses([...responses, responseText]);
            setResponseText('');
        }
    };

    const renderResponseItem = ({ item }) => (
        <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Detalles del Foro {forumId}</Text>
            <Text style={styles.content}>Aquí puedes ver los mensajes y participar en la discusión.</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Escribe una respuesta..."
                value={responseText}
                onChangeText={setResponseText}
            />
            <Button title="Responder" onPress={handleAddResponse} />
            
            <FlatList
                data={responses}
                renderItem={renderResponseItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.responsesList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    content: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    responseContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        width: '100%',
    },
    responseText: {
        fontSize: 16,
    },
    responsesList: {
        marginTop: 20,
        width: '100%',
    },
});

export default ForumDetailScreen;
