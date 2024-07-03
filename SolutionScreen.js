import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import RubiksCube3D from './RubiksCube3D';
import solver from 'rubiks-cube-solver';
import {
  rotateRight,
  rotateRightInverse,
  rotateUp,
  rotateUpInverse,
  rotateFront,
  rotateFrontInverse,
  rotateLeft,
  rotateLeftInverse,
  rotateDown,
  rotateDownInverse,
  rotateBack,
  rotateBackInverse,
} from './cubeRotation';

const SolutionScreen = ({ route, navigation }) => {
  const { cubeState } = route.params;
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentCubeState, setCurrentCubeState] = useState(cubeState);

  useEffect(() => {
    // Ensure each face is represented by single characters for each color
    const cubeString = [
      cubeState.F.join(''), // front
      cubeState.R.join(''), // right
      cubeState.U.join(''), // up
      cubeState.D.join(''), // down
      cubeState.L.join(''), // left
      cubeState.B.join('')  // back
    ].join('');

    console.log(cubeString); // For debugging

    if (cubeString.length !== 54) {
      console.error('Invalid cube state:', cubeString);
      return;
    }

    try {
      const moves = solver(cubeString);
      setSolutionSteps(moves.split(' '));
    } catch (error) {
      console.error('Error solving cube:', error);
    }
  }, [cubeState]);

  const rotateCube = (axis, value) => {
    setRotation(prevRotation => {
      const newRotation = [...prevRotation];
      newRotation[axis] += value;
      return newRotation;
    });
  };

  const nextStep = () => {
    if (currentStep < solutionSteps.length) {
      const step = solutionSteps[currentStep];
      handleStep(step);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStep = (step) => {
    switch (step) {
      case 'R':
        setCurrentCubeState(prevState => rotateRight(prevState));
        break;
      case 'R\'':
        setCurrentCubeState(prevState => rotateRightInverse(prevState));
        break;
      case 'U':
        setCurrentCubeState(prevState => rotateUp(prevState));
        break;
      case 'U\'':
        setCurrentCubeState(prevState => rotateUpInverse(prevState));
        break;
      case 'F':
        setCurrentCubeState(prevState => rotateFront(prevState));
        break;
      case 'F\'':
        setCurrentCubeState(prevState => rotateFrontInverse(prevState));
        break;
      case 'L':
        setCurrentCubeState(prevState => rotateLeft(prevState));
        break;
      case 'L\'':
        setCurrentCubeState(prevState => rotateLeftInverse(prevState));
        break;
      case 'D':
        setCurrentCubeState(prevState => rotateDown(prevState));
        break;
      case 'D\'':
        setCurrentCubeState(prevState => rotateDownInverse(prevState));
        break;
      case 'B':
        setCurrentCubeState(prevState => rotateBack(prevState));
        break;
      case 'B\'':
        setCurrentCubeState(prevState => rotateBackInverse(prevState));
        break;
      default:
        console.log('Unknown step:', step);
    }
  };

  const resetCube = () => {
    setCurrentCubeState(cubeState);
    setCurrentStep(0);
    setRotation([0, 0, 0]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Solution Screen</Text>
      <View style={styles.cube3DContainer}>
        <RubiksCube3D cubeState={currentCubeState} rotation={rotation} />
      </View>
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
      <View style={styles.stepButtonContainer}>
        <Button title="Next Step" onPress={nextStep} />
        <Button title="Reset" onPress={resetCube} color="red" />
      </View>
      <Text style={styles.stepText}>Current Step: {solutionSteps[currentStep]}</Text>
      <Text style={styles.solutionText}>Solution Moves: {solutionSteps.join(' ')}</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>Back to Input</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cube3DContainer: {
    height: 300,
    width: 300,
    marginBottom: 20,
  },
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
  stepButtonContainer: {
    marginBottom: 20,
  },
  stepText: {
    fontSize: 18,
    marginTop: 10,
  },
  solutionText: {
    fontSize: 18,
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});

export default SolutionScreen;
