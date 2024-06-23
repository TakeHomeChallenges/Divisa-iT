export function isValidDate(day, month, year) {
    if (month < 1 || month > 12) {
      return false;
    }
  
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      if (isLeapYear) {
        daysInMonth[1] = 29;
      }
    }
    return day > 0 && day <= daysInMonth[month - 1];
  }
  
  export function isValidFormat(date) {
    const datePattern = /^\d{2}-\d{2}-\d{1,4}$/;
    return datePattern.test(date);
  }