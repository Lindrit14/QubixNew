import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const AlgorithmScreen = () => {
    const navigation = useNavigation();
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
            <Picker
                selectedValue={algorithm}
                style={styles.picker}
                onValueChange={(itemValue) => handleAlgorithmChange(itemValue)}
            >
                <Picker.Item label="CFOP" value="CFOP" />
                <Picker.Item label="Roux" value="Roux" />
            </Picker>
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
    picker: {
        height: 50,
        width: 200,
        color: 'white',
    },
});

export default AlgorithmScreen;
