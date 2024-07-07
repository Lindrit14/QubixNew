import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CubeFace from './CubeFace';
import { useLanguage } from '../context/LanguageContext';

const CubeFaces = ({ cubeState, handleColorChange }) => {
    const { language } = useLanguage();

    const faceNames = {
        U: language === 'english' ? 'Up' : 'Oben',
        L: language === 'english' ? 'Left' : 'Links',
        F: language === 'english' ? 'Front' : 'Vorne',
        R: language === 'english' ? 'Right' : 'Rechts',
        B: language === 'english' ? 'Back' : 'Hinten',
        D: language === 'english' ? 'Down' : 'Unten',
    };

    return (
        <View style={styles.faceContainer}>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.U}</Text>
                    <CubeFace faceConfig={cubeState.U} onColorChange={(index) => handleColorChange('U', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.L}</Text>
                    <CubeFace faceConfig={cubeState.L} onColorChange={(index) => handleColorChange('L', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.F}</Text>
                    <CubeFace faceConfig={cubeState.F} onColorChange={(index) => handleColorChange('F', index)} />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.R}</Text>
                    <CubeFace faceConfig={cubeState.R} onColorChange={(index) => handleColorChange('R', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.B}</Text>
                    <CubeFace faceConfig={cubeState.B} onColorChange={(index) => handleColorChange('B', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>{faceNames.D}</Text>
                    <CubeFace faceConfig={cubeState.D} onColorChange={(index) => handleColorChange('D', index)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    faceContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10
    },
    faceTitle: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 5
    },
});

export default CubeFaces;
