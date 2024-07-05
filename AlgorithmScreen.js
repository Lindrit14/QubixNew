import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AlgorithmScreen = () => {
    const [algorithm, setAlgorithm] = useState('CFOP');

    useEffect(() => {
        const getAlgorithm = async () => {
            const savedAlgorithm = await AsyncStorage.getItem('solvingAlgorithm');
            if (savedAlgorithm) {
                setAlgorithm(savedAlgorithm);
            }
        };
        getAlgorithm();
    }, []);

    const handleAlgorithmChange = async (value) => {
        setAlgorithm(value);
        await AsyncStorage.setItem('solvingAlgorithm', value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Solving Algorithm</Text>
            <Text style={styles.selectedAlgorithmText}>Currently Selected: {algorithm}</Text>
            <Text style={styles.selectedAlgorithmText}>Reset Cube after choosing!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.algorithmButton, algorithm === 'CFOP' && styles.selectedButton]}
                    onPress={() => handleAlgorithmChange('CFOP')}
                >
                    <Text style={styles.buttonText}>CFOP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.algorithmButton, algorithm === 'Kociemba' && styles.selectedButton]}
                    onPress={() => handleAlgorithmChange('Kociemba')}
                >
                    <Text style={styles.buttonText}>Kociemba</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282c34",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    selectedAlgorithmText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    algorithmButton: {
        backgroundColor: 'blue',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default AlgorithmScreen;
