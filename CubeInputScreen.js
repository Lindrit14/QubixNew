import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Text, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import CubeFace from './CubeFace';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import solver from 'rubiks-cube-solver';
import { saveSolve } from './solvingHistory';

const initialFaceState = new Array(9).fill('white');

const colors = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];

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

  useEffect(() => {
    checkSolvability();
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

      const moves = solver(filteredCubeString); // This will throw an error if the cube is unsolvable

      setLoading(false);
      await saveSolve({
        date: new Date().toISOString(),
        steps: moves.split(' '),
      });
      navigation.navigate('Solution', { cubeState });
    } catch (error) {
      setLoading(false);
      Alert.alert("Unsolvable Configuration", "Please adjust your cube configuration before solving.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Color</Text>
      <View style={styles.colorContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0 }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <Text style={styles.selectedColor}>Selected Color: {selectedColor}</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: isSolvable ? 'blue' : 'gray' }]}
          onPress={() => isSolvable ? handleSolve() : Alert.alert("Unsolvable Configuration", "Please adjust your cube configuration before solving.")}
          disabled={!isSolvable}
        >
          <Text style={styles.buttonText}>Solve Cube</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('InputInfo')}>
          <Text style={styles.buttonText}>Input Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'green' }]} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>View Solving History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={resetCube}>
          <Text style={styles.buttonText}>Reset Cube</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={loading} transparent>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.loadingText}>Checking if solvable...</Text>
        </View>
      </Modal>
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
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  colorButton: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    borderColor: 'white',
  },
  selectedColor: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
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
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  actionButton: {
    width: '80%',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
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
  }
});

export default CubeInputScreen;
