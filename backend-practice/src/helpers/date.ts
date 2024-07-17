export const getNextDay = (origin: string) => {
  let date = new Date(origin);

  date.setDate(date.getDate() + 1);

  let nextDate = date.toISOString().slice(0, 10);

  return nextDate;
};
