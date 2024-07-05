import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ActionButtons = ({ isSolvable, handleSolve, resetCube, handleLogout, navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isSolvable ? 'blue' : 'gray' }]}
                onPress={() => isSolvable ? handleSolve() : Alert.alert("Unsolvable Configuration", "Please adjust your cube configuration before solving.")}
                disabled={!isSolvable}
            >
                <Text style={styles.buttonText}>Solve Cube</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('InputInfo')}>
                <Text style={styles.buttonText}>Input Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'orange' }]} onPress={resetCube}>
                <Text style={styles.buttonText}>Reset Cube</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
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
