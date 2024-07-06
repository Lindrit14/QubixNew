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

// Save the current progress
export const saveCurrentProgress = async (progress) => {
    try {
        await AsyncStorage.setItem('currentProgress', JSON.stringify(progress));
    } catch (error) {
        console.error("Error saving current progress:", error);
    }
};

// Load the current progress
export const loadCurrentProgress = async () => {
    try {
        const progress = await AsyncStorage.getItem('currentProgress');
        return progress ? JSON.parse(progress) : null;
    } catch (error) {
        console.error("Error loading current progress:", error);
        return null;
    }
};

// Clear the current progress
export const clearCurrentProgress = async () => {
    try {
        await AsyncStorage.removeItem('currentProgress');
    } catch (error) {
        console.error("Error clearing current progress:", error);
    }
};