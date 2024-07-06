// CubeControls.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CubeControls = ({ rotateCube }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(0, Math.PI / 6)}>
                <Text>Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(0, -Math.PI / 6)}>
                <Text>Down</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(1, Math.PI / 6)}>
                <Text>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(1, -Math.PI / 6)}>
                <Text>Right</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: 'lightblue',
        opacity: 0.8,
        borderRadius: 5,
    },
});

export default CubeControls;
