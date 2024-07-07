import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const AnalysisScreen = ({ route }) => {
    const { stepTimes, totalTimeTaken } = route.params;
    const { language } = useLanguage();

    const renderAnalysisStep = ({ item, index }) => (
        <Text style={styles.analysisText}>
            {language === 'english' ? 'Step' : 'Schritt'} {index + 1}: {item.step} - {item.duration.toFixed(2)} {language === 'english' ? 'seconds' : 'Sekunden'}
        </Text>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{language === 'english' ? 'Analysis' : 'Analyse'}</Text>
            <Text style={styles.totalTimeText}>
                {language === 'english' ? 'Total Time: ' : 'Gesamtzeit: '} {totalTimeTaken} {language === 'english' ? 'seconds' : 'Sekunden'}
            </Text>
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
        color: 'white',
    },
    totalTimeText: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white',
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
