function getDateObject(day) {
  let date;

  if (day instanceof Date) {
    date = day;
  } else if (day) {
    date = new Date(day);
  } else {
    date = new Date();
  }
  return date;
}

export function getStartOfDay(day) {
  const date = getDateObject(day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getEndOfDay(day = new Date()) {
  const date = getDateObject(day);
  date.setHours(23, 59, 59, 999);
  return date;
}
