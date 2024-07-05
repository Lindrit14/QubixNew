// CubeTimer.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CubeTimer = ({ overallTime }) => {
    return (
        <Text style={styles.timerText}>Time: {overallTime.toFixed(2)}s</Text>
    );
};

const styles = StyleSheet.create({
    timerText: {
        fontSize: 14,
        color: 'white',
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default CubeTimer;
