/**
 * A validator function that prevents a user from picking past days.
 *
 * @param {Date} calendarDay - a calendar day, starting at "00:00:00" hours
 *
 * @return {Boolan} If the day can be picked by the user (valid) or not.
 */
import { getISODay, addDays }  from 'date-fns';

// follow the getISODay format (7 for Sunday, 1 for Monday)
const dayOfWeekMap = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thur: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
};



function getClosestDayOfLastWeek(dayOfWeek, week, fromDate = new Date()) {
    // -7 means last week
    // dayOfWeekMap[dayOfWeek] get the ISODay for the desired dayOfWeek

    // e.g. If today is Sunday, getISODay(fromDate) will returns 7
    // if the day we want to find is Thursday(4), apart from subtracting one week(-7),
    // we also need to account for the days between Sunday(7) and Thursday(4)
    // Hence we need to also subtract (getISODay(fromDate) - dayOfWeekMap[dayOfWeek])
    const offsetDays = week - (getISODay(fromDate) - dayOfWeekMap[dayOfWeek]);

    const now = addDays(fromDate, offsetDays)
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      );;
}
export function preventPastDays(calendarDay) {
  const days = [
    getClosestDayOfLastWeek('Thur', 0).getTime(),
    getClosestDayOfLastWeek('Thur', 7).getTime(),
    getClosestDayOfLastWeek('Thur', 14).getTime(),
  
    getClosestDayOfLastWeek('Fri', 0).getTime(),
    getClosestDayOfLastWeek('Fri', 7).getTime(),
    getClosestDayOfLastWeek('Fri', 14).getTime(),
  
    getClosestDayOfLastWeek('Sat', 0).getTime(),
    getClosestDayOfLastWeek('Sat', 7).getTime(),
    getClosestDayOfLastWeek('Sat', 14).getTime()
  ];

  const isValid = days.includes(calendarDay.getTime());
  return isValid;
}
