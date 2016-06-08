export function getStartOfDay(day) {
  const date = new Date(day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getEndOfDay(day) {
  const date = new Date(day);
  date.setHours(23, 59, 59, 999);
  return date;
}
