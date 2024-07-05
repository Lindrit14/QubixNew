import AsyncStorage from '@react-native-async-storage/async-storage';

const SOLVING_HISTORY_KEY = 'solving_history';

export const saveSolve = async (solve) => {
    try {
        const history = await getSolvingHistory();
        history.push(solve);
        await AsyncStorage.setItem(SOLVING_HISTORY_KEY, JSON.stringify(history));
        console.log('Saving solve:', solve);
    } catch (error) {
        console.error('Error saving solving history:', error);
    }
};

export const getSolvingHistory = async () => {
    try {
        const history = await AsyncStorage.getItem(SOLVING_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error fetching solving history:', error);
        return [];
    }
};

