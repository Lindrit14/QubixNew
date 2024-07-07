import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/firebaseConfig';
import { useLanguage } from '../context/LanguageContext';

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
        const { language } = useLanguage();
        console.error(language === 'english' ? 'Error saving solving history:' : 'Fehler beim Speichern der Lösungsgeschichte:', error);
    }
};

export const getSolvingHistory = async () => {
    try {
        const key = getKeyWithUserEmail(SOLVING_HISTORY_KEY);
        const history = await AsyncStorage.getItem(key);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        const { language } = useLanguage();
        console.error(language === 'english' ? 'Error fetching solving history:' : 'Fehler beim Abrufen der Lösungsgeschichte:', error);
        return [];
    }
};

export const saveCurrentProgress = async (progress) => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        await AsyncStorage.setItem(key, JSON.stringify(progress));
        console.log('Saving current progress:', progress);
    } catch (error) {
        const { language } = useLanguage();
        console.error(language === 'english' ? 'Error saving current progress:' : 'Fehler beim Speichern des aktuellen Fortschritts:', error);
    }
};

export const loadCurrentProgress = async () => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        const progress = await AsyncStorage.getItem(key);
        return progress ? JSON.parse(progress) : null;
    } catch (error) {
        const { language } = useLanguage();
        console.error(language === 'english' ? 'Error loading current progress:' : 'Fehler beim Laden des aktuellen Fortschritts:', error);
        return null;
    }
};

export const clearCurrentProgress = async () => {
    try {
        const key = getKeyWithUserEmail(CURRENT_PROGRESS_KEY);
        await AsyncStorage.removeItem(key);
        console.log('Cleared current progress');
    } catch (error) {
        const { language } = useLanguage();
        console.error(language === 'english' ? 'Error clearing current progress:' : 'Fehler beim Löschen des aktuellen Fortschritts:', error);
    }
};
