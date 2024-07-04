import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import RubiksCube3D from './RubiksCube3D';
import solver from 'rubiks-cube-solver';
import { saveSolve, getSolvingHistory } from './solvingHistory';
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

const SolutionScreen = ({ route, navigation }) => {
  const { cubeState } = route.params;
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentCubeState, setCurrentCubeState] = useState(cubeState);
  const [cubeHistory, setCubeHistory] = useState([cubeState]);
  const [originalCubeState, setOriginalCubeState] = useState(cubeState);
  const [solvingHistory, setSolvingHistory] = useState([]);

  const colorToChar = {
    green: 'f',
    orange: 'l',
    white: 'u',
    red: 'r',
    blue: 'b',
    yellow: 'd'
  };

  const mapColorsToChars = (str) => {
    return str.replace(/green|orange|white|red|blue|yellow/g, matched => colorToChar[matched]);
  };

  const isValidCubeState = (cubeString) => {
    const colorCounts = {
      f: 0,
      l: 0,
      u: 0,
      d: 0,
      r: 0,
      b: 0
    };

    for (const char of cubeString) {
      if (colorCounts[char] !== undefined) {
        colorCounts[char]++;
      } else {
        return false;
      }
    }

    return Object.values(colorCounts).every(count => count === 9);
  };

  useEffect(() => {
    const cubeString = [
      cubeState.F.join(''), // front
      cubeState.R.join(''), // right
      cubeState.U.join(''), // up
      cubeState.D.join(''), // down
      cubeState.L.join(''), // left
      cubeState.B.join('')  // back
    ].join('');

    const filteredCubeString = mapColorsToChars(cubeString);

    console.log('Original Cube State:', cubeState);
    console.log('Filtered Cube String:', filteredCubeString); // Debugging output

    if (filteredCubeString.length !== 54 || !isValidCubeState(filteredCubeString)) {
      console.error('Invalid cube state:', filteredCubeString);
      return;
    }

    if (filteredCubeString === 'fffffffffrrrrrrrrruuuuuuuuudddddddddlllllllllbbbbbbbbb') {
      console.log('The cube is already solved.');
      setSolutionSteps(['Cube is already solved.']);
      return;
    }

    try {
      const moves = solver(filteredCubeString);
      setSolutionSteps(moves.split(' '));
    } catch (error) {
      console.error('Error solving cube:', error);
    }
  }, [cubeState]);

  useEffect(() => {
    const fetchSolvingHistory = async () => {
      const history = await getSolvingHistory();
      console.log('Solving history on mount:', history);
      setSolvingHistory(history);
    };

    fetchSolvingHistory();
  }, []);

  const rotateCube = (axis, value) => {
    setRotation(prevRotation => {
      const newRotation = [...prevRotation];
      newRotation[axis] += value;
      return newRotation;
    });
  };

  const inverseMoves = {
    'R': 'Rprime',
    'Rprime': 'R',
    'R2': 'R2',
    'U': 'Uprime',
    'Uprime': 'U',
    'U2': 'U2',
    'F': 'Fprime',
    'Fprime': 'F',
    'F2': 'F2',
    'L': 'Lprime',
    'Lprime': 'L',
    'L2': 'L2',
    'D': 'Dprime',
    'Dprime': 'D',
    'D2': 'D2',
    'B': 'Bprime',
    'Bprime': 'B',
    'B2': 'B2',
    'M': 'Mprime',
    'Mprime': 'M',
    'M2': 'M2',
    'E': 'Eprime',
    'Eprime': 'E',
    'E2': 'E2',
    'S': 'Sprime',
    'Sprime': 'S',
    'S2': 'S2'
  };

  const logCubeState = (state, step) => {
    console.log(`Cube State after ${step}:`, JSON.stringify(state, null, 2));
  };

  const nextStep = async () => {
    if (currentStep < solutionSteps.length) {
      const step = solutionSteps[currentStep];
      handleStep(step);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === solutionSteps.length) {
      const solve = {
        date: new Date().toISOString(),
        steps: solutionSteps,
      };
      console.log('Saving current solve:', solve);
      await saveSolve(solve);
      const history = await getSolvingHistory();
      setSolvingHistory(history);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStep = solutionSteps[currentStep - 1];
      handleStep(inverseMoves[prevStep]);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStep = (step) => {
    let newState;
    console.log('Executing Step:', step);
    switch (step) {
      case 'R':
        newState = rotateRight(currentCubeState);
        break;
      case "Rprime":
        newState = rotateRightInverse(currentCubeState);
        break;
      case 'R2':
        newState = rotateRight180(currentCubeState);
        break;
      case 'U':
        newState = rotateUp(currentCubeState);
        break;
      case "Uprime":
        newState = rotateUpInverse(currentCubeState);
        break;
      case 'U2':
        newState = rotateUp180(currentCubeState);
        break;
      case 'F':
        newState = rotateFront(currentCubeState);
        break;
      case "Fprime":
        newState = rotateFrontInverse(currentCubeState);
        break;
      case 'F2':
        newState = rotateFront180(currentCubeState);
        break;
      case 'L':
        newState = rotateLeft(currentCubeState);
        break;
      case "Lprime":
        newState = rotateLeftInverse(currentCubeState);
        break;
      case 'L2':
        newState = rotateLeft180(currentCubeState);
        break;
      case 'D':
        newState = rotateDown(currentCubeState);
        break;
      case "Dprime":
        newState = rotateDownInverse(currentCubeState);
        break;
      case 'D2':
        newState = rotateDown180(currentCubeState);
        break;
      case 'B':
        newState = rotateBack(currentCubeState);
        break;
      case "Bprime":
        newState = rotateBackInverse(currentCubeState);
        break;
      case 'B2':
        newState = rotateBack180(currentCubeState);
        break;
      case 'M':
        newState = rotateMiddle(currentCubeState);
        break;
      case "Mprime":
        newState = rotateMiddleInverse(currentCubeState);
        break;
      case 'E':
        newState = rotateEquatorial(currentCubeState);
        break;
      case "Eprime":
        newState = rotateEquatorialInverse(currentCubeState);
        break;
      case 'S':
        newState = rotateStanding(currentCubeState);
        break;
      case "Sprime":
        newState = rotateStandingInverse(currentCubeState);
        break;
      default:
        console.log('Unknown step:', step);
        return;
    }
    logCubeState(newState, step);
    setCurrentCubeState(newState);
    setCubeHistory([...cubeHistory, newState]);
  };

  const resetCube = () => {
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
        <Button title="Step Back" onPress={prevStep} />
        <Button title="Reset Position" onPress={resetCube} color="red" />
      </View>
      <Text style={styles.stepText}>Current Step: {solutionSteps[currentStep]}</Text>
      <Text style={styles.solutionText}>Solution Moves: {solutionSteps.join(' ')}</Text>
      {/* <Text style={styles.historyTitle}>Solving History:</Text>
      {solvingHistory.map((solve, index) => (
        <Text key={index}>{`${solve.date} - Steps: ${solve.steps.join(' ')}`}</Text>
      ))}
        */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>Back to Input</Text>
      </TouchableOpacity>
    </ScrollView>
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
    color: 'white'
  },
  solutionText: {
    fontSize: 18,
    marginTop: 10,
    color: 'white'
  },
  historyTitle: {
    fontSize: 18,
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});

export default SolutionScreen;