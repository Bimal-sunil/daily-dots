// Formats a Date object or timestamp as YYYY-MM-DD in local time
export function formatDate(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Returns the date string for today
export function getTodayDateString() {
  return formatDate(new Date());
}

// Returns an array of date strings for the last N days (chronological order: oldest -> today)
export function getLastNDays(daysCount = 30) {
  const days = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}

// User friendly label for a date (e.g. "Today", "Yesterday", "Oct 28")
export function formatFriendlyDate(dateStr) {
  if (!dateStr) return '';
  const todayStr = getTodayDateString();
  if (dateStr === todayStr) return 'Today';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateStr === formatDate(yesterday)) return 'Yesterday';

  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

