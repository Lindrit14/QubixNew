import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import solver from 'rubiks-cube-solver';
import ColorPicker from './components/ColorPicker';
import CubeFaces from './components/CubeFaces';
import ActionButtons from './components/ActionButtons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cubeSolver from 'cube-solver';


const initialFaceState = new Array(9).fill('white');

const CubeInputScreen = () => {
  const navigation = useNavigation();
  const [cubeState, setCubeState] = useState({
    U: [...initialFaceState],
    L: [...initialFaceState],
    F: [...initialFaceState],
    R: [...initialFaceState],
    B: [...initialFaceState],
    D: [...initialFaceState]
  });
  const [selectedColor, setSelectedColor] = useState('white');
  const [isSolvable, setIsSolvable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [algorithm, setAlgorithm] = useState('CFOP');

  useEffect(() => {
    checkSolvability();
    const getAlgorithm = async () => {
      const savedAlgorithm = await AsyncStorage.getItem('solvingAlgorithm');
      if (savedAlgorithm) {
        setAlgorithm(savedAlgorithm);
      }
    };
    getAlgorithm();
  }, [cubeState]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };

  const handleColorChange = (face, index) => {
    const newFaceState = [...cubeState[face]];
    newFaceState[index] = selectedColor;
    setCubeState(prevState => ({
      ...prevState,
      [face]: newFaceState
    }));
    console.log('Updated Cube State:', JSON.stringify(cubeState, null, 2));
    console.log("Algorithm:", algorithm)
  };

  const checkSolvability = () => {
    const colorCounts = Object.values(cubeState).flat().reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});

    const isSolvable = Object.values(colorCounts).every(count => count === 9);
    setIsSolvable(isSolvable);
  };

  const resetCube = () => {
    const newState = {
      U: [...initialFaceState],
      L: [...initialFaceState],
      F: [...initialFaceState],
      R: [...initialFaceState],
      B: [...initialFaceState],
      D: [...initialFaceState]
    };
    setCubeState(newState);
    console.log('Reset Cube State:', JSON.stringify(newState, null, 2));
    setIsSolvable(false);
  };

  const handleSolve = async () => {
    setLoading(true);
    try {
      const cubeString = [
        cubeState.F.join(''),
        cubeState.R.join(''),
        cubeState.U.join(''),
        cubeState.D.join(''),
        cubeState.L.join(''),
        cubeState.B.join('')
      ].join('');

      const filteredCubeString = cubeString.replace(/green|orange|white|red|blue|yellow/g, matched => ({
        green: 'f',
        orange: 'l',
        white: 'u',
        red: 'r',
        blue: 'b',
        yellow: 'd'
      }[matched]));




      let moves;
      if (algorithm === 'CFOP') {
        moves = solver(filteredCubeString); // Use CFOP
      } else if (algorithm === 'Kociemba') {
        moves = cubeSolver.solve(filteredCubeString, 'kociemba'); // Use Kociemba
        console.log('Kociemba Moves:', moves);
      } else {
        throw new Error('Unsupported algorithm selected');
      }


      setLoading(false);
      navigation.navigate('Solution', { cubeState });
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Unsolvable Configuration", "Please adjust your cube configuration before solving.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <CubeFaces cubeState={cubeState} handleColorChange={handleColorChange} />
        <ActionButtons
          isSolvable={isSolvable}
          handleSolve={handleSolve}
          resetCube={resetCube}
          handleLogout={handleLogout}
          navigation={navigation}
        />
        <Modal visible={loading} transparent>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={styles.loadingText}>Checking if solvable...</Text>
          </View>
        </Modal>
      </ScrollView>
      <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="white" />
      </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
  settingsIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default CubeInputScreen;
