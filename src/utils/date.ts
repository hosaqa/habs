const getCurrentMonth = () => new Date().getMonth();

const getMonthName = (monthIndex = getCurrentMonth()) => {
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthList[monthIndex];
};

const getCurrentYear = () => new Date().getFullYear();

const getDaysInMonth = (month = getCurrentMonth(), year = getCurrentYear()) => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const getCurrentWeek = (date = new Date()) => {
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = date.getDate() - date.getDay() + i;
    let day = new Date(date.setDate(first));
    day.setHours(0, 0, 0, 0);
    week.push(day);
  }

  return week;
};

export { getCurrentMonth, getMonthName, getCurrentYear, getDaysInMonth, getCurrentWeek };
