import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebaseConfig';
import { useLanguage } from '../context/LanguageContext';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');
    const { language, changeLanguage } = useLanguage();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {language === 'english' ? 'Settings' : 'Einstellungen'}
            </Text>
            {userEmail ? (
                <Text style={styles.emailText}>
                    {language === 'english' ? `Logged in as: ${userEmail}` : `Eingeloggt als: ${userEmail}`}
                </Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
                <Text style={styles.buttonText}>
                    {language === 'english' ? 'Solving History' : 'Lösungs Verlauf'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Algorithm')}>
                <Text style={styles.buttonText}>
                    {language === 'english' ? 'Solving Algorithm' : 'Lösungs Algorithmus'}
                </Text>
            </TouchableOpacity>
            <View style={styles.languageContainer}>
                <TouchableOpacity onPress={() => changeLanguage('english')}>
                    <Image
                        source={require('../../assets/english.png')}
                        style={[styles.flag, language === 'english' ? {} : styles.selectedFlag]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeLanguage('german')}>
                    <Image
                        source={require('../../assets/german.png')}
                        style={[styles.flag, language === 'german' ? {} : styles.selectedFlag]}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.selectedLanguageText}>
                {language === 'english' ? 'Selected Language: English' : 'Ausgewählte Sprache: Deutsch'}
            </Text>
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
    languageContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    flag: {
        width: 50,
        height: 30,
        marginHorizontal: 10,
    },
    selectedFlag: {
        opacity: 0.3,
    },
    selectedLanguageText: {
        fontSize: 16,
        color: 'white',
        marginTop: 20,
    },
});

export default SettingsScreen;
