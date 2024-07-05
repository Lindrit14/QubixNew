import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CubeFace from './CubeFace';

const CubeFaces = ({ cubeState, handleColorChange }) => {
    return (
        <View style={styles.faceContainer}>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.faceTitle}>Up</Text>
                    <CubeFace faceConfig={cubeState.U} onColorChange={(index) => handleColorChange('U', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>Left</Text>
                    <CubeFace faceConfig={cubeState.L} onColorChange={(index) => handleColorChange('L', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>Front</Text>
                    <CubeFace faceConfig={cubeState.F} onColorChange={(index) => handleColorChange('F', index)} />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <View>
                    <Text style={styles.faceTitle}>Right</Text>
                    <CubeFace faceConfig={cubeState.R} onColorChange={(index) => handleColorChange('R', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>Back</Text>
                    <CubeFace faceConfig={cubeState.B} onColorChange={(index) => handleColorChange('B', index)} />
                </View>
                <View>
                    <Text style={styles.faceTitle}>Down</Text>
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
