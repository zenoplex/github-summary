export function getStartOfDay(day) {
  const date = (day instanceof Date) ? day : new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getEndOfDay(day) {
  const date = (day instanceof Date) ? day : new Date();
  date.setHours(23, 59, 59, 999);
  return date;
}
