import { formatDate, getTodayDateString } from './date';

/**
 * Calculates current streak and best streak from a habit's history object.
 * @param {Record<string, boolean>} history - Map of date string (YYYY-MM-DD) to boolean completion.
 * @returns {{ currentStreak: number, bestStreak: number }}
 */
export function calculateStreaks(history = {}) {
  const completedDateStrings = Object.keys(history).filter((dateStr) => Boolean(history[dateStr]));

  if (completedDateStrings.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const todayStr = getTodayDateString();

  // 1. Calculate Current Streak
  let currentStreak = 0;
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const isTodayDone = Boolean(history[todayStr]);

  if (isTodayDone) {
    currentStreak = 1;
    // Check backwards from yesterday
    let checkDate = new Date(todayDate);
    checkDate.setDate(checkDate.getDate() - 1);
    while (Boolean(history[formatDate(checkDate)])) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else {
    // Today not done yet. Check if yesterday was done (active streak not broken yet)
    let checkDate = new Date(todayDate);
    checkDate.setDate(checkDate.getDate() - 1);
    if (Boolean(history[formatDate(checkDate)])) {
      currentStreak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
      while (Boolean(history[formatDate(checkDate)])) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else {
      currentStreak = 0;
    }
  }

  // 2. Calculate Best Streak across all completed history
  // Sort distinct completed dates chronologically
  const sortedDates = Array.from(new Set(completedDateStrings)).sort();

  let maxStreak = 0;
  let runningStreak = 0;
  let prevDate = null;

  for (const dateStr of sortedDates) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const currentDate = new Date(y, m - 1, d);
    currentDate.setHours(0, 0, 0, 0);

    if (!prevDate) {
      runningStreak = 1;
    } else {
      const diffMs = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        runningStreak++;
      } else if (diffDays > 1) {
        runningStreak = 1;
      }
    }

    if (runningStreak > maxStreak) {
      maxStreak = runningStreak;
    }

    prevDate = currentDate;
  }

  const bestStreak = Math.max(maxStreak, currentStreak);

  return { currentStreak, bestStreak };
}

