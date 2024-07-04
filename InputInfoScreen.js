import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const InputInfoScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cube Input Information</Text>
            <Text style={styles.infoText}>Default Cube Postion:</Text>
            <Image source={require('./assets/CubeLayout.png')} style={styles.image} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#121212'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E0E0',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        color: '#B0B0B0',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    image: {
        borderRadius: 5,
    }
});

export default InputInfoScreen;
