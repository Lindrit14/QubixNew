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

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "CubeInput" : "Login"}>
        {user ? (
          <>
            <Stack.Screen name="CubeInput" component={CubeInputScreen} />
            <Stack.Screen name="Solution" component={SolutionScreen} />
            <Stack.Screen name="InputInfo" component={InputInfoScreen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Algorithm" component={AlgorithmScreen} />
            <Stack.Screen name="CubeTester" component={CubeTester} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
