import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import RubiksCube3D from '../components/RubiksCube3D';
import { saveSolve, getSolvingHistory, saveCurrentProgress } from '../components/solvingHistory';
import CubeTimer from '../components/CubeTimer';
import CubeControls from '../components/CubeControls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useLanguage } from '../context/LanguageContext';
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
} from '../components/cubeRotation';

const SolutionScreen = ({ route, navigation }) => {
  const { cubeState, solutionAlgorithm, moves } = route.params;
  const { language } = useLanguage();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentCubeState, setCurrentCubeState] = useState(cubeState);
  const [cubeHistory, setCubeHistory] = useState([cubeState]);
  const [startTime, setStartTime] = useState(null);
  const [stepTimes, setStepTimes] = useState([]);
  const [overallTime, setOverallTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(null);
  const [solvingHistory, setSolvingHistory] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const fetchSolvingHistory = async () => {
      const history = await getSolvingHistory();
      setSolvingHistory(history);
    };

    fetchSolvingHistory();
  }, []);

  useEffect(() => {
    const initialTime = new Date();
    setStartTime(initialTime);
    setStepStartTime(initialTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSolved && startTime) {
        setOverallTime((new Date() - startTime) / 1000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isSolved, startTime]);

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

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

  const checkIfSolved = (cubeState) => {
    const solvedState = {
      U: Array(9).fill('white'),
      L: Array(9).fill('orange'),
      F: Array(9).fill('green'),
      R: Array(9).fill('red'),
      B: Array(9).fill('blue'),
      D: Array(9).fill('yellow')
    };
    return JSON.stringify(cubeState) === JSON.stringify(solvedState);
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

    if (filteredCubeString.length !== 54 || !isValidCubeState(filteredCubeString)) {
      console.error(language === 'english' ? 'Invalid cube state:' : 'Ungültiger Würfelzustand:', filteredCubeString);
      return;
    }

    if (checkIfSolved(cubeState)) {
      console.log(language === 'english' ? 'The cube is already solved.' : 'Der Würfel ist bereits gelöst.');
      setSolutionSteps([language === 'english' ? 'Cube is already solved.' : 'Der Würfel ist bereits gelöst.']);
      setIsSolved(true);
      return;
    }

    console.log("algorithm", solutionAlgorithm)
    try {
      setSolutionSteps(moves.split(' ').filter(step => step.trim() !== ''));
      setStartTime(new Date());
    } catch (error) {
      console.error(language === 'english' ? 'Error solving cube:' : 'Fehler beim Lösen des Würfels:', error);
    }
  }, [cubeState, solutionAlgorithm, language]);

  const rotateCube = (axis, value) => {
    setRotation(prevRotation => {
      const newRotation = [...prevRotation];
      newRotation[axis] += value;
      return newRotation;
    });
  };

  const inverseMoves = {
    'R': 'Rprime',
    "R'": 'R',
    'Rprime': 'R',
    'R2': 'R2',
    'U': 'Uprime',
    "U'": 'U',
    'Uprime': 'U',
    'U2': 'U2',
    'F': 'Fprime',
    "F'": 'F',
    'Fprime': 'F',
    'F2': 'F2',
    'L': 'Lprime',
    "L'": 'L',
    'Lprime': 'L',
    'L2': 'L2',
    'D': 'Dprime',
    "D'": 'D',
    'Dprime': 'D',
    'D2': 'D2',
    'B': 'Bprime',
    "B'": 'B',
    'Bprime': 'B',
    'B2': 'B2',
    'M': 'Mprime',
    "M'": 'M',
    'Mprime': 'M',
    'M2': 'M2',
    'E': 'Eprime',
    "E'": 'E',
    'Eprime': 'E',
    'E2': 'E2',
    'S': 'Sprime',
    "S'": 'S',
    'Sprime': 'S',
    'S2': 'S2'
  };

  const logCubeState = (state, step) => {
    console.log(`Cube State after ${step}:`, JSON.stringify(state, null, 2));
  };

  const nextStep = async () => {
    if (currentStep >= solutionSteps.length) return; // Disable if last step

    if (currentStep < solutionSteps.length) {
      const step = solutionSteps[currentStep];
      const stepStart = stepStartTime || new Date();
      handleStep(step);
      const stepEndTime = new Date();
      const stepDuration = (stepEndTime - stepStart) / 1000;

      setStepTimes(prevStepTimes => [
        ...prevStepTimes,
        { step, duration: stepDuration }
      ]);

      setStepStartTime(stepEndTime); // Update stepStartTime after recording the duration
      setCurrentStep(currentStep + 1);

      if (checkIfSolved(currentCubeState)) {
        setIsSolved(true);
        setShowCelebration(true);
        Alert.alert(
          language === 'english' ? "Cube Solved!" : "Würfel Gelöst!",
          language === 'english' ? `Congratulations! You have solved the cube in ${overallTime.toFixed(2)} seconds.` : `Herzlichen Glückwunsch! Sie haben den Würfel in ${overallTime.toFixed(2)} Sekunden gelöst.`
        );
        const solve = {
          date: new Date().toISOString(),
          steps: solutionSteps,
        };
        await saveSolve(solve);
        const history = await getSolvingHistory();
        setSolvingHistory(history);
      }
    } else if (currentStep === solutionSteps.length) {
      const solve = {
        date: new Date().toISOString(),
        steps: solutionSteps,
      };
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
      setStepTimes(prevStepTimes => prevStepTimes.slice(0, -1));
      if (isSolved) setIsSolved(false); // If going back, cube is no longer solved
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
      case "R'":
        newState = rotateRightInverse(currentCubeState);
        break;
      case 'R2':
        newState = rotateRight180(currentCubeState);
        break;
      case 'U':
        newState = rotateUp(currentCubeState);
        break;
      case "Uprime":
      case "U'":
        newState = rotateUpInverse(currentCubeState);
        break;
      case 'U2':
        newState = rotateUp180(currentCubeState);
        break;
      case 'F':
        newState = rotateFront(currentCubeState);
        break;
      case "Fprime":
      case "F'":
        newState = rotateFrontInverse(currentCubeState);
        break;
      case 'F2':
        newState = rotateFront180(currentCubeState);
        break;
      case 'L':
        newState = rotateLeft(currentCubeState);
        break;
      case "Lprime":
      case "L'":
        newState = rotateLeftInverse(currentCubeState);
        break;
      case 'L2':
        newState = rotateLeft180(currentCubeState);
        break;
      case 'D':
        newState = rotateDown(currentCubeState);
        break;
      case "Dprime":
      case "D'":
        newState = rotateDownInverse(currentCubeState);
        break;
      case 'D2':
        newState = rotateDown180(currentCubeState);
        break;
      case 'B':
        newState = rotateBack(currentCubeState);
        break;
      case "Bprime":
      case "B'":
        newState = rotateBackInverse(currentCubeState);
        break;
      case 'B2':
        newState = rotateBack180(currentCubeState);
        break;
      case 'M':
        newState = rotateMiddle(currentCubeState);
        break;
      case "Mprime":
      case "M'":
        newState = rotateMiddleInverse(currentCubeState);
        break;
      case 'E':
        newState = rotateEquatorial(currentCubeState);
        break;
      case "Eprime":
      case "E'":
        newState = rotateEquatorialInverse(currentCubeState);
        break;
      case 'S':
        newState = rotateStanding(currentCubeState);
        break;
      case "Sprime":
      case "S'":
        newState = rotateStandingInverse(currentCubeState);
        break;
      default:
        console.log('Unknown step:', step);
        return;
    }
    logCubeState(newState, step);
    setCurrentCubeState(newState);
    setCubeHistory([...cubeHistory, newState]);
    setStepStartTime(new Date());
  };

  const resetCube = () => {
    setRotation([0, 0, 0]);
  };

  const saveProgress = async () => {
    await saveCurrentProgress({
      currentCubeState,
      currentStep,
      solutionSteps,
      startTime,
      stepTimes,
      overallTime,
      isSolved,
      stepStartTime,
    });
    Alert.alert(
      language === 'english' ? "Progress Saved" : "Fortschritt Gespeichert",
      language === 'english' ? "Your current progress has been saved." : "Ihr aktueller Fortschritt wurde gespeichert."
    );
  };

  const renderStep = ({ item, index }) => (
    <Text style={styles.stepText}>{language === 'english' ? `Step ${index + 1}: ${item}` : `Schritt ${index + 1}: ${item}`}</Text>
  );

  const totalTimeTaken = stepTimes.reduce((acc, curr) => acc + curr.duration, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{language === 'english' ? 'Solution Screen' : 'Lösungsbildschirm'}</Text>
      <CubeTimer overallTime={overallTime} />
      <View style={styles.cube3DContainer}>
        <RubiksCube3D cubeState={currentCubeState} rotation={rotation} />
      </View>
      <CubeControls rotateCube={rotateCube} />
      <Text style={styles.currentStepText}>{language === 'english' ? `Current Step: ${solutionSteps[currentStep]}` : `Aktueller Schritt: ${solutionSteps[currentStep]}`}</Text>
      <View style={styles.stepControls}>
        <TouchableOpacity onPress={prevStep} style={styles.stepButton}>
          <Text style={styles.stepButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepCounter}>{currentStep + 1}/{solutionSteps.length + 1}</Text>
        <TouchableOpacity onPress={nextStep} style={[styles.stepButton, (isSolved || currentStep >= solutionSteps.length) && styles.disabledButton]} disabled={isSolved || currentStep >= solutionSteps.length}>
          <Text style={styles.stepButtonText}>→</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={resetCube} style={styles.resetCube}>
        <Text style={styles.buttonText}>{language === 'english' ? 'Reset Position' : 'Position Zurücksetzen'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={saveProgress}>
        <Text style={styles.buttonText}>{language === 'english' ? 'Save Progress' : 'Fortschritt Speichern'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Analysis', { stepTimes, totalTimeTaken: overallTime.toFixed(2) })}>
        <Text style={styles.buttonText}>{language === 'english' ? 'Show Analysis' : 'Analyse Anzeigen'}</Text>
      </TouchableOpacity>
      {(currentStep < solutionSteps.length || !isSolved) && (
        <FlatList
          data={solutionSteps}
          renderItem={renderStep}
          keyExtractor={(item, index) => index.toString()}
          style={styles.stepList}
        />
      )}
      <Text style={styles.solutionText}>{language === 'english' ? `Solution Moves: ${solutionSteps.join(' ')}` : `Lösungszüge: ${solutionSteps.join(' ')}`}</Text>
      {showCelebration && (
        <LottieView
          source={require('../../assets/celebration.json')}
          autoPlay
          loop={false}
          style={styles.celebration}
        />
      )}
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
    height: 250,
    width: 250,
    marginBottom: 10,
  },
  stepControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  stepButton: {
    padding: 10,
  },
  stepButtonText: {
    fontSize: 24,
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
  stepCounter: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
  },
  stepText: {
    fontSize: 18,
    color: 'white',
  },
  stepList: {
    width: '100%',
  },
  currentStepText: {
    fontSize: 18,
    marginTop: 10,
    color: 'white'
  },
  solutionText: {
    fontSize: 18,
    marginTop: 5,
    color: 'white'
  },
  actionButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  celebration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  resetCube: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    marginBottom: 5
  }
});

export default SolutionScreen;
