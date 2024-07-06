import AsyncStorage from '@react-native-async-storage/async-storage';

const SOLVING_HISTORY_KEY = 'solving_history';
const CURRENT_PROGRESS_KEY = 'current_progress';

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

export const saveCurrentProgress = async (cubeState) => {
    try {
        await AsyncStorage.setItem(CURRENT_PROGRESS_KEY, JSON.stringify(cubeState));
        console.log('Current progress saved:', cubeState);
    } catch (error) {
        console.error('Error saving current progress:', error);
    }
};

export const loadCurrentProgress = async () => {
    try {
        const progress = await AsyncStorage.getItem(CURRENT_PROGRESS_KEY);
        return progress ? JSON.parse(progress) : null;
    } catch (error) {
        console.error('Error loading current progress:', error);
        return null;
    }
};

export const clearCurrentProgress = async () => {
    try {
        await AsyncStorage.removeItem(CURRENT_PROGRESS_KEY);
        console.log('Current progress cleared');
    } catch (error) {
        console.error('Error clearing current progress:', error);
    }
};
