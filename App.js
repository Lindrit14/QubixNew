import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import LoginScreen from './LoginScreen';
import RegisterScreen from './registerScreen';
import CubeInputScreen from './CubeInputScreen';
import SolutionScreen from './SolutionScreen';
import InputInfoScreen from './InputInfoScreen';
import HistoryScreen from './HistoryScreen';

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
            <Stack.Screen name="History" component={HistoryScreen} />
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
