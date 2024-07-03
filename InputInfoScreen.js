import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const InputInfoScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cube Input Information</Text>
            <Text style={styles.infoText}>Here's how to position your cube:</Text>
            <Image source={require('./assets/CubeLayout.png')} style={styles.image} />
            <Text style={styles.infoText}>
                - The "Up" face is the top face of the cube.
                {'\n'}
                - The "Down" face is the bottom face of the cube.
                {'\n'}
                - The "Left" face is the left side when you look at the front.
                {'\n'}
                - The "Right" face is the right side when you look at the front.
                {'\n'}
                - The "Front" face is the side facing you.
                {'\n'}
                - The "Back" face is the opposite side of the front face.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
});

export default InputInfoScreen;
