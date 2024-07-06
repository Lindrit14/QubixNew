// SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            {userEmail ? <Text style={styles.emailText}>Logged in as: {userEmail}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
                <Text style={styles.buttonText}>Solving History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Algorithm')}>
                <Text style={styles.buttonText}>Solving Algorithm</Text>
            </TouchableOpacity>
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
        color: 'white',
        marginBottom: 40,
    },
    emailText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default SettingsScreen;
