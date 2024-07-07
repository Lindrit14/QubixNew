import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const CubeControls = ({ rotateCube }) => {
    const { language } = useLanguage();

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(0, Math.PI / 6)}>
                <Text>{language === 'english' ? 'Up' : 'Hoch'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(0, -Math.PI / 6)}>
                <Text>{language === 'english' ? 'Down' : 'Runter'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(1, Math.PI / 6)}>
                <Text>{language === 'english' ? 'Left' : 'Links'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => rotateCube(1, -Math.PI / 6)}>
                <Text>{language === 'english' ? 'Right' : 'Rechts'}</Text>
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
