export function getStartOfDay(day = new Date()) {
  const date = (day instanceof Date) ? day : new Date(day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getEndOfDay(day = new Date()) {
  const date = (day instanceof Date) ? day : new Date(day);
  date.setHours(23, 59, 59, 999);
  return date;
}
