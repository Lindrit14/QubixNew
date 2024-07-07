import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/firebaseConfig';
import LoginScreen from './src/Pages/LoginScreen';
import RegisterScreen from './src/Pages/registerScreen';
import CubeInputScreen from './src/Pages/CubeInputScreen';
import SolutionScreen from './src/Pages/SolutionScreen';
import InputInfoScreen from './src/Pages/InputInfoScreen';
import AnalysisScreen from './src/Pages/AnalysisScreen';
import HistoryScreen from './src/Pages/HistoryScreen';
import SettingsScreen from './src/Pages/SettingsScreen';
import AlgorithmScreen from './src/Pages/AlgorithmScreen';
import CubeTester from './src/Pages/CubeTester';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import { titles } from './titles';

const Stack = createNativeStackNavigator();

const AppContent = ({ user }) => {
  const { language } = useLanguage();

  return (
    <Stack.Navigator
      initialRouteName={user ? "CubeInput" : "Login"}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#20232a',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="CubeInput" component={CubeInputScreen} options={{ title: titles[language].CubeInput }} />
          <Stack.Screen name="Solution" component={SolutionScreen} options={{ title: titles[language].Solution }} />
          <Stack.Screen name="InputInfo" component={InputInfoScreen} options={{ title: titles[language].InputInfo }} />
          <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ title: titles[language].Analysis }} />
          <Stack.Screen name="History" component={HistoryScreen} options={{ title: titles[language].History }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: titles[language].Settings }} />
          <Stack.Screen name="Algorithm" component={AlgorithmScreen} options={{ title: titles[language].Algorithm }} />
          <Stack.Screen name="CubeTester" component={CubeTester} options={{ title: titles[language].CubeTester }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: titles[language].Login }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: titles[language].Register }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppContent user={user} />
      </NavigationContainer>
    </LanguageProvider>
  );
}
