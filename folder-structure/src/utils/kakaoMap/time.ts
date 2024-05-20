export const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

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

export const TenDaysLater = (date: Date) => {
  const newDate = new Date(date);
  return dateMidFormatter(new Date(newDate.setDate(newDate.getDate() + 10)));
};

export const dateFormatter = (date: Date | undefined) => {
  if (date) {
    const year = date?.getFullYear();
    const month =
      date?.getMonth() + 1 <= 9
        ? "0" + (date?.getMonth() + 1)
        : date?.getMonth() + 1;
    const dates =
      date?.getDate() <= 9 ? "0" + date?.getDate() : date?.getDate();
    const day = date?.getDay();

    const dateFormat =
      year + "." + month + "." + dates + "(" + weekOfDay[day] + ")";

    return dateFormat;
  } else return "";
};

// 일정사이의 날짜 구하기

const diff = (date1: Date, date2: Date) =>
  Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

export const CalculateDuration = (
  date1: Date | undefined,
  date2: Date | undefined
) => {
  const days = [];
  if (date1 && date2) {
    const formattedDate1 = dateMidFormatter(date1);
    const formattedDate2 = dateMidFormatter(date2);

    const diffs = diff(formattedDate1, formattedDate2);

    for (let i = 0; i <= diffs; i++) {
      const newDate = new Date(
        formattedDate1.setDate(formattedDate1.getDate() + i)
      );

      days.push(newDate);
    }
  }

  return days;
};
