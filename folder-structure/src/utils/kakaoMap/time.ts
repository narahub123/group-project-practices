export const dateMidFormatter = (naiveDate: Date) =>
  new Date(naiveDate.setHours(0, 0, 0, 0));

// calculate month
// a month before
export const MonthBefore = (date: Date) =>
  dateMidFormatter(new Date(date.setMonth(date.getMonth() - 1)));

// current month
export const MonthCurrent = (date: Date) => dateMidFormatter(date);

// a month later
export const MonthLater = (date: Date) =>
  dateMidFormatter(new Date(date.setMonth(date.getMonth() + 1)));

// destructure

export const DestrucDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return { year, month, day };
};

// get day
const firstOfMonth = (date: Date) => {
  const day = DestrucDate(MonthCurrent(date));

  return new Date(day.year, day.month, 1).getDate();
};

const lastOfMonth = (date: Date) => {
  const day = DestrucDate(MonthCurrent(date));

  return new Date(day.year, day.month + 1, 0).getDate();
};

const WeekOffirstDay = (date: Date) => {
  const day = DestrucDate(MonthCurrent(date));

  return new Date(day.year, day.month, 1).getDay();
};

// calculate dates of a month
export const MonthlyDates = (date: Date) => {
  const dates = [];

  const formattedDate = dateMidFormatter(date);
  //   console.log(formattedDate);

  const firstDay = WeekOffirstDay(formattedDate);
  //   console.log(firstDay);

  const lastDate = lastOfMonth(formattedDate);
  //   console.log(lastDate);

  const lastDateLastMonth = lastOfMonth(MonthBefore(formattedDate));

  if (firstDay !== 0) {
    for (let i = firstDay - 1; i >= 0; i--) {
      const lastMonthDate = lastDateLastMonth - i;
      dates.push(lastMonthDate);
    }
  }

  for (let i = 1; i <= lastDate; i++) {
    dates.push(i);
  }

  return dates;
};

// console.log(dateMidFormatter(new Date()));

// console.log(MonthCurrent(new Date()));
// console.log(MonthLater(new Date()));

// console.log(lastOfMonth(new Date()));
// console.log(firstOfMonth(new Date()));
// console.log(WeekOffirstDay(new Date()));
// console.log(MonthlyDates(new Date()));
// console.log(MonthlyDates(new Date()));
