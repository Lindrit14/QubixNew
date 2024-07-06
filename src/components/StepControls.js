// StepControls.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const StepControls = ({ nextStep, prevStep, resetCube, showAnalysis }) => {
    return (
        <View style={styles.stepButtonContainer}>
            <Button title="Next Step" onPress={nextStep} />
            <Button title="Step Back" onPress={prevStep} />
            <Button title="Reset Position" onPress={resetCube} color="red" />
            <Button title="Show Analysis" onPress={showAnalysis} />
        </View>
    );
};

const styles = StyleSheet.create({
    stepButtonContainer: {
        marginBottom: 20,
    },
});

export default StepControls;
