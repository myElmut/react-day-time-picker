/* eslint-disable no-console */
/**
 * A validator function that prevents a user from picking past days.
 *
 * @param {Date} calendarDay - a calendar day, starting at "00:00:00" hours
 *
 * @return {Boolan} If the day can be picked by the user (valid) or not.
 */
import { getISODay, addDays, getHours } from 'date-fns';

// follow the getISODay format (7 for Sunday, 1 for Monday)
const dayOfWeekMap = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thur: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7
};

function getClosestDayOfLastWeek(dayOfWeek, week, fromDate = new Date()) {
  // -7 means last week
  // dayOfWeekMap[dayOfWeek] get the ISODay for the desired dayOfWeek

  // e.g. If today is Sunday, getISODay(fromDate) will returns 7
  // if the day we want to find is Thursday(4), apart from subtracting one week(-7),
  // we also need to account for the days between Sunday(7) and Thursday(4)
  // Hence we need to also subtract (getISODay(fromDate) - dayOfWeekMap[dayOfWeek])
  const offsetDays = week - (getISODay(fromDate) - dayOfWeekMap[dayOfWeek]);

  const now = addDays(fromDate, offsetDays);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

const updateWeekAnchor = () => {
  const now = new Date();
  const nowDay = getISODay(now);
  const nowHours = getHours(now);

  // if today is SUN MON (TUE before 12pm)
  if (nowDay === 1 || (nowDay === 2 && nowHours < 12)) {
    return true;
  }
  return false;
};

export function preventPastDays(calendarDay) {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );

  const isValid = calendarDay.getTime() >= today.getTime();
  return isValid;
}

export function exceptHoliday(calendarDay) {
  const days = [
    new Date('01/01/2023').getTime(),
    new Date('04/13/2023').getTime(),
    new Date('05/01/2023').getTime(),
    new Date('05/8/2023').getTime(),
    new Date('05/26/2023').getTime(),
    new Date('06/06/2023').getTime(),
    new Date('07/14/2023').getTime(),
    new Date('08/15/2023').getTime(),
    new Date('11/01/2023').getTime(),
    new Date('11/11/2023').getTime(),
    new Date('12/25/2023').getTime()
  ];

  const isHoliday = days.includes(calendarDay.getTime());
  return isHoliday;
}

const getMultiples = (f, t = 21) => {
  return [...Array(Math.floor(t / f))].map((_, i) => f * (i + 1));
};

export function dayValidator(slots, calendarDay, maxWeeks, fromDate) {
  const rangeWeeks = getMultiples(7, maxWeeks);

  let days = [];

  if (updateWeekAnchor()) {
    days.push(getClosestDayOfLastWeek('Thur', 0).getTime());
    days.push(getClosestDayOfLastWeek('Fri', 0).getTime());
    days.push(getClosestDayOfLastWeek('Sat', 0).getTime());
  }

  // if today is before thursday
  rangeWeeks.forEach(week => {
    days.push(getClosestDayOfLastWeek('Thur', week).getTime());
    days.push(getClosestDayOfLastWeek('Fri', week).getTime());
    days.push(getClosestDayOfLastWeek('Sat', week).getTime());
  });

  if (slots) {
    const slotsDays = slots.reduce((acc, curr) => {
      const currDay = new Date(curr.deliveryDate);
      currDay.setHours(0, 0, 0, 0);

      const currTime = currDay.getTime();
      if (!acc[currTime]) acc[currTime] = null; //If this type wasn't previously stored
      acc[currTime] = currTime;
      return acc;
    }, {});

    days = [...[...days, ...Object.values(slotsDays)]];
  }

  if (fromDate) {
    days = days.filter(day => {
      return (
        getClosestDayOfLastWeek('Sat', 7, new Date(day)).getTime() >
        getClosestDayOfLastWeek('Sat', 7, new Date(fromDate)).getTime()
      );
    });
  }

  const isValid = days.includes(calendarDay.getTime());
  const isHoliday = exceptHoliday(calendarDay);

  return isValid && !isHoliday;
}
