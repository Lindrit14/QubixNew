import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function solveRubiksCube(config) {
    // This dummy function just returns a series of moves as a string,
    // In a real implementation, this function would analyze 'config' to produce a solution.
    return "R U R' U' R' F R2 U' R' U' R U R' F'";
  }
  

function SolutionScreen({ route, navigation }) {
  const { cubeConfig } = route.params;
  const solution = solveRubiksCube(cubeConfig); // Call the solver function
  
  return (
    <View style={styles.container}>
      <Text>Solution Steps: {solution}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text>Back to Input</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
  },
});

export default SolutionScreen;
