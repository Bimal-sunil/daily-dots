import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_STORAGE_KEY = '@daily_dots:habits_v1';

export async function loadHabits() {
  try {
    const raw = await AsyncStorage.getItem(HABITS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Error reading habits from storage:', error);
  }
  return [];
}

export async function saveHabits(habits) {
  try {
    await AsyncStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.warn('Error saving habits to storage:', error);
  }
}

