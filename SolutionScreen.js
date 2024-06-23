import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function SolutionScreen({ route, navigation }) {
  const { cubeConfig } = route.params;
  const solutionSteps = solveRubiksCube(cubeConfig);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < solutionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  function solveRubiksCube(config) {
    // In a real app, this function would analyze the 'config' to compute a solution.
    // For now, we return a dummy solution that represents a typical sequence of moves.
    return ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"];
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Solution Steps</Text>
      <Text style={styles.step}>Step {currentStep + 1}: {solutionSteps[currentStep]}</Text>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.button} onPress={prevStep} disabled={currentStep === 0}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextStep} disabled={currentStep === solutionSteps.length - 1}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>Back to Input</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  step: {
    fontSize: 20,
    color: 'navy',
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    opacity: 0.8,
    borderRadius: 5
  },
  backButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5
  },
});

export default SolutionScreen;
