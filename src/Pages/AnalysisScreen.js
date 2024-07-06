import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AnalysisScreen = ({ route }) => {
    const { stepTimes, totalTimeTaken } = route.params;

    const renderAnalysisStep = ({ item, index }) => (
        <Text style={styles.analysisText}>Step {index + 1}: {item.step} - {item.duration.toFixed(2)} seconds</Text>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analysis</Text>
            <Text style={styles.totalTimeText}>Total Time: {totalTimeTaken} seconds</Text>
            <FlatList
                data={stepTimes}
                renderItem={renderAnalysisStep}
                keyExtractor={(item, index) => index.toString()}
                style={styles.analysisList}
            />
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
    totalTimeText: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white'
    },
    analysisList: {
        width: '100%',
    },
    analysisText: {
        fontSize: 18,
        color: 'white',
    },
});

export default AnalysisScreen;
