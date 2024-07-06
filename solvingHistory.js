import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';

const getKeyWithUserEmail = (key) => {
    const userEmail = auth.currentUser ? auth.currentUser.email : 'default';
    return `${userEmail}_${key}`;
};

const SOLVING_HISTORY_KEY = 'solving_history';
const CURRENT_PROGRESS_KEY = 'current_progress';

export const saveSolve = async (solve) => {
    try {
        const key = getKeyWithUserEmail(SOLVING_HISTORY_KEY);
        const history = await getSolvingHistory();
        history.push(solve);
        await AsyncStorage.setItem(key, JSON.stringify(history));
        console.log('Saving solve:', solve);
    } catch (error) {
        console.error('Error saving solving history:', error);
    }
};

export const getSolvingHistory = async () => {
    try {
        const key = getKeyWithUserEmail(SOLVING_HISTORY_KEY);
        const history = await AsyncStorage.getItem(key);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error fetching solving history:', error);
        return [];
    }
};

export const saveCurrentProgress = async (progress) => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        await AsyncStorage.setItem(key, JSON.stringify(progress));
        console.log('Saving current progress:', progress);
    } catch (error) {
        console.error('Error saving current progress:', error);
    }
};

export const loadCurrentProgress = async () => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        const progress = await AsyncStorage.getItem(key);
        return progress ? JSON.parse(progress) : null;
    } catch (error) {
        console.error('Error loading current progress:', error);
        return null;
    }
};

export const clearCurrentProgress = async () => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        await AsyncStorage.removeItem(key);
        console.log('Cleared current progress');
    } catch (error) {
        console.error('Error clearing current progress:', error);
    }
};
