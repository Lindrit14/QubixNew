import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getSolvingHistory } from '../components/solvingHistory';

const HistoryScreen = () => {
    const [solvingHistory, setSolvingHistory] = useState([]);

    useEffect(() => {
        const fetchSolvingHistory = async () => {
            const history = await getSolvingHistory();
            setSolvingHistory(history.reverse());
        };

        fetchSolvingHistory();
    }, []);

    const formatDate = (isoString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    const renderItem = ({ item }) => (
        <View style={styles.historyItem}>
            <Text style={styles.historyText}>{`Date: ${formatDate(item.date)}`}</Text>
            <Text style={styles.historyText}>{`Steps: ${item.steps.join(' ')}`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Solving History</Text>
            {solvingHistory.length === 0 ? (
                <Text style={styles.noHistory}>No solving history found.</Text>
            ) : (
                <FlatList
                    data={solvingHistory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#282c34',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    noHistory: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#ffffff'
    },
    listContent: {
        paddingBottom: 20,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    historyText: {
        color: '#ffffff',
    },
});

export default HistoryScreen;
