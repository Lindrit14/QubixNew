import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const InputInfoScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cube Input Information</Text>
            <Text style={styles.infoText}>Default Cube Position:</Text>
            <Image source={require('../../assets/CubeLayout.png')} style={styles.image} />
            <Text style={styles.infoText}>
                It's important to always know which face is where so you can correctly input the colors.
                If you input the colors incorrectly, the algorithms will not work properly. Make sure you
                follow the default cube position as shown in the image above.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#282c34'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'justify',
        marginBottom: 10,
        marginTop: 10,
    },
    image: {
        borderRadius: 5,
    }
});

export default InputInfoScreen;
