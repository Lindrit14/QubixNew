import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const CubeTimer = ({ overallTime }) => {
    const { language } = useLanguage();

    return (
        <Text style={styles.timerText}>
            {language === 'english' ? 'Time:' : 'Zeit:'} {overallTime.toFixed(2)}s
        </Text>
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
