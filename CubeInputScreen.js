import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import CubeFace from './CubeFace';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

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
  };

  const checkSolvability = () => {
    // Flatten the cubeState and count occurrences of each color
    const colorCounts = Object.values(cubeState).flat().reduce((acc, color) => {
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {});

    // Check if each color appears exactly 9 times
    const isSolvable = Object.values(colorCounts).every(count => count === 9);
    setIsSolvable(isSolvable);
  };


  const randomizeCube = () => {
    const cube = Cubejs.random();
    // Assume we have a function to map this random cube state back to the UI's cubeState format
    setCubeState(parseCubeString(cube.asString()));
  };

  const resetCube = () => {
    setCubeState({
      U: [...initialFaceState],
      L: [...initialFaceState],
      F: [...initialFaceState],
      R: [...initialFaceState],
      B: [...initialFaceState],
      D: [...initialFaceState]
    });
    setIsSolvable(false); // Reset solvability status
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Color</Text>
      <View style={styles.colorContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <Text style={styles.selectedColor}>Selected Color: {selectedColor}</Text>
      <View style={styles.faceContainer}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={{ color: 'white' }}>1</Text>
            <CubeFace faceConfig={cubeState.U} onColorChange={(index) => handleColorChange('U', index)} />
          </View>
          <View>
            <Text style={{ color: 'white' }}>2</Text>
            <CubeFace faceConfig={cubeState.L} onColorChange={(index) => handleColorChange('L', index)} />
          </View>
          <View>
            <Text style={{ color: 'white' }}>3</Text>
            <CubeFace faceConfig={cubeState.F} onColorChange={(index) => handleColorChange('F', index)} />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={{ color: 'white' }}>4</Text>
            <CubeFace faceConfig={cubeState.R} onColorChange={(index) => handleColorChange('R', index)} />
          </View>
          <View>
            <Text style={{ color: 'white' }}>5</Text>
            <CubeFace faceConfig={cubeState.B} onColorChange={(index) => handleColorChange('B', index)} />
          </View>
          <View>
            <Text style={{ color: 'white' }}>6</Text>
            <CubeFace faceConfig={cubeState.D} onColorChange={(index) => handleColorChange('D', index)} />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Solve Cube"
          onPress={() => isSolvable ? navigation.navigate('Solution', { cubeState }) : Alert.alert("Unsolvable Configuration", "Please adjust your cube configuration before solving.")}
          color={isSolvable ? 'blue' : 'gray'}
          disabled={!isSolvable}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          color='red'
        />
        <Button
          title="Reset Cube"
          onPress={resetCube}
          color="red"
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20
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
  },
  selectedColor: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',  // Take full width to space items evenly
    marginBottom: 10
  }
});


export default CubeInputScreen;
