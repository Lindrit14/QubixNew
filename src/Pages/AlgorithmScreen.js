import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../context/LanguageContext';

const AlgorithmScreen = () => {
    const [algorithm, setAlgorithm] = useState('min2phase');
    const { language } = useLanguage();

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
            <Text style={styles.title}>
                {language === 'english' ? 'Solving Algorithm' : 'Lösungsalgorithmus'}
            </Text>
            <Text style={styles.selectedAlgorithmText}>
                {language === 'english' ? 'Currently Selected: ' : 'Derzeit ausgewählt: '} {algorithm}
            </Text>
            <Text style={styles.selectedAlgorithmText}>
                {language === 'english' ? 'Reset Cube after choosing!' : 'Setzen Sie den Würfel nach einer neuen Auswahl zurück!'}
            </Text>
            <Text style={styles.selectedAlgorithmText}>
                {language === 'english' ? 'We recommend using the min2phase algorithm' : 'Wir empfehlen die Verwendung des min2phase-Algorithmus'}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.algorithmButton, algorithm === 'CFOP' && styles.selectedButton]}
                    onPress={() => handleAlgorithmChange('CFOP')}
                >
                    <Text style={styles.buttonText}>CFOP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.algorithmButton, algorithm === 'min2phase' && styles.selectedButton]}
                    onPress={() => handleAlgorithmChange('min2phase')}
                >
                    <Text style={styles.buttonText}>min2phase</Text>
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
