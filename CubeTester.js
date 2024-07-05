import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RubiksCube3D from './RubiksCube3D';
import CubeControls from './components/CubeControls';
import {
    rotateRight,
    rotateRightInverse,
    rotateRight180,
    rotateUp,
    rotateUpInverse,
    rotateUp180,
    rotateFront,
    rotateFrontInverse,
    rotateFront180,
    rotateLeft,
    rotateLeftInverse,
    rotateLeft180,
    rotateDown,
    rotateDownInverse,
    rotateDown180,
    rotateBack,
    rotateBackInverse,
    rotateBack180,
    rotateMiddle,
    rotateMiddleInverse,
    rotateMiddle180,
    rotateEquatorial,
    rotateEquatorialInverse,
    rotateEquatorial180,
    rotateStanding,
    rotateStandingInverse,
    rotateStanding180,
} from './cubeRotation';

const CubeTester = () => {
    const solvedCube = {
        U: Array(9).fill('white'),
        L: Array(9).fill('orange'),
        F: Array(9).fill('green'),
        R: Array(9).fill('red'),
        B: Array(9).fill('blue'),
        D: Array(9).fill('yellow')
    };

    const [currentCubeState, setCurrentCubeState] = useState(solvedCube);
    const [rotation, setRotation] = useState([0, 0, 0]);

    const handleRotation = (rotationFunc) => {
        setCurrentCubeState(rotationFunc(currentCubeState));
    };

    const rotateCube = (axis, value) => {
        setRotation(prevRotation => {
            const newRotation = [...prevRotation];
            newRotation[axis] += value;
            return newRotation;
        });
    };

    const resetCube = () => {
        setCurrentCubeState(solvedCube);
        setRotation([0, 0, 0]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cube Tester</Text>
            <View style={styles.cube3DContainer}>
                <RubiksCube3D cubeState={currentCubeState} rotation={rotation} />
            </View>
            <CubeControls rotateCube={rotateCube} />
            <View style={styles.buttonContainer}>
                <Button title="Rotate Right" onPress={() => handleRotation(rotateRight)} />
                <Button title="Rotate Right Inverse" onPress={() => handleRotation(rotateRightInverse)} />
                <Button title="Rotate Right 180" onPress={() => handleRotation(rotateRight180)} />
                <Button title="Rotate Up" onPress={() => handleRotation(rotateUp)} />
                <Button title="Rotate Up Inverse" onPress={() => handleRotation(rotateUpInverse)} />
                <Button title="Rotate Up 180" onPress={() => handleRotation(rotateUp180)} />
                <Button title="Rotate Front" onPress={() => handleRotation(rotateFront)} />
                <Button title="Rotate Front Inverse" onPress={() => handleRotation(rotateFrontInverse)} />
                <Button title="Rotate Front 180" onPress={() => handleRotation(rotateFront180)} />
                <Button title="Rotate Left" onPress={() => handleRotation(rotateLeft)} />
                <Button title="Rotate Left Inverse" onPress={() => handleRotation(rotateLeftInverse)} />
                <Button title="Rotate Left 180" onPress={() => handleRotation(rotateLeft180)} />
                <Button title="Rotate Down" onPress={() => handleRotation(rotateDown)} />
                <Button title="Rotate Down Inverse" onPress={() => handleRotation(rotateDownInverse)} />
                <Button title="Rotate Down 180" onPress={() => handleRotation(rotateDown180)} />
                <Button title="Rotate Back" onPress={() => handleRotation(rotateBack)} />
                <Button title="Rotate Back Inverse" onPress={() => handleRotation(rotateBackInverse)} />
                <Button title="Rotate Back 180" onPress={() => handleRotation(rotateBack180)} />
                <Button title="Rotate Middle" onPress={() => handleRotation(rotateMiddle)} />
                <Button title="Rotate Middle Inverse" onPress={() => handleRotation(rotateMiddleInverse)} />
                <Button title="Rotate Middle 180" onPress={() => handleRotation(rotateMiddle180)} />
                <Button title="Rotate Equatorial" onPress={() => handleRotation(rotateEquatorial)} />
                <Button title="Rotate Equatorial Inverse" onPress={() => handleRotation(rotateEquatorialInverse)} />
                <Button title="Rotate Equatorial 180" onPress={() => handleRotation(rotateEquatorial180)} />
                <Button title="Rotate Standing" onPress={() => handleRotation(rotateStanding)} />
                <Button title="Rotate Standing Inverse" onPress={() => handleRotation(rotateStandingInverse)} />
                <Button title="Rotate Standing 180" onPress={() => handleRotation(rotateStanding180)} />
                <Button title="Reset Cube" onPress={resetCube} color="red" />
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
        marginBottom: 20,
        color: 'white'
    },
    cube3DContainer: {
        height: 300,
        width: 300,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        margin: 5,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
    },
});

export default CubeTester;
