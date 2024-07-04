import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getSolvingHistory } from './solvingHistory';

const HistoryScreen = () => {
    const [solvingHistory, setSolvingHistory] = useState([]);

    useEffect(() => {
        const fetchSolvingHistory = async () => {
            const history = await getSolvingHistory();
            setSolvingHistory(history);
        };

        fetchSolvingHistory();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Solving History</Text>
            {solvingHistory.length === 0 ? (
                <Text style={styles.noHistory}>No solving history found.</Text>
            ) : (
                solvingHistory.map((solve, index) => (
                    <View key={index} style={styles.historyItem}>
                        <Text>{`Date: ${solve.date}`}</Text>
                        <Text>{`Steps: ${solve.steps.join(' ')}`}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noHistory: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
});

export default HistoryScreen;
