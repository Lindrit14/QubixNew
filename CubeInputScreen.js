import React, { useState } from 'react';
import { View, ScrollView, Button, StyleSheet } from 'react-native';
import CubeFace from './CubeFace'; 
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const initialFaceState = new Array(9).fill('white');

const CubeInputScreen = ({ navigation }) => {
  const [cubeState, setCubeState] = useState({
    U: [...initialFaceState],
    L: [...initialFaceState],
    F: [...initialFaceState],
    R: [...initialFaceState],
    B: [...initialFaceState],
    D: [...initialFaceState]
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };


  const handleColorChange = (face, index) => {
    const colors = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];
    const newFaceState = [...cubeState[face]];
    const currentColorIndex = colors.indexOf(newFaceState[index]);
    newFaceState[index] = colors[(currentColorIndex + 1) % colors.length];
    setCubeState({
      ...cubeState,
      [face]: newFaceState
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.faceContainer}>
        <CubeFace faceConfig={cubeState.U} onColorChange={(index) => handleColorChange('U', index)} />
      </View>
      <View style={styles.faceContainer}>
        <CubeFace faceConfig={cubeState.L} onColorChange={(index) => handleColorChange('L', index)} />
        <CubeFace faceConfig={cubeState.F} onColorChange={(index) => handleColorChange('F', index)} />
        <CubeFace faceConfig={cubeState.R} onColorChange={(index) => handleColorChange('R', index)} />
        <CubeFace faceConfig={cubeState.B} onColorChange={(index) => handleColorChange('B', index)} />
      </View>
      <View style={styles.faceContainer}>
        <CubeFace faceConfig={cubeState.D} onColorChange={(index) => handleColorChange('D', index)} />
      </View>
      <Button title="Solve Cube" onPress={() => navigation.navigate('Solution', { cubeState })} />
      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"black",
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  faceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  }
});

export default CubeInputScreen;
