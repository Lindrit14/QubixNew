import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const ActionButtons = ({ isSolvable, handleSolve, resetCube, handleLogout, navigation }) => {
    const { language } = useLanguage();

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isSolvable ? 'blue' : 'gray' }]}
                onPress={() => isSolvable ? handleSolve() : Alert.alert(
                    language === 'english' ? "Unsolvable Configuration" : "Unlösbare Konfiguration",
                    language === 'english' ? "Please adjust your cube configuration before solving." : "Bitte passen Sie Ihre Würfelkonfiguration an, bevor Sie lösen."
                )}
                disabled={!isSolvable}
            >
                <Text style={styles.buttonText}>{language === 'english' ? 'Solve Cube' : 'Würfel Lösen'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('InputInfo')}>
                <Text style={styles.buttonText}>{language === 'english' ? 'Input Info' : 'Eingabe Info'}</Text>
            </TouchableOpacity>
            {/*  
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('CubeTester')}>
                <Text style={styles.buttonText}>Cube-Testing</Text>
            </TouchableOpacity>
            */}
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'orange' }]} onPress={resetCube}>
                <Text style={styles.buttonText}>{language === 'english' ? 'Reset Cube' : 'Würfel Zurücksetzen'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>{language === 'english' ? 'Logout' : 'Abmelden'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center'
    },
    actionButton: {
        width: '70%',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default ActionButtons;
