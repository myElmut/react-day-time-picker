/**
 * A validator function to determine if a time slot can be selected by the user
 * or not.
 *
 * @param {Date} slotTime - a time slot
 *
 * @return {Boolan} If the time slot is valid or not.
//  */

import { getISODay, addDays } from 'date-fns';

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

export function daySlotValidator(slotDay) {
  if (!slotDay) {
    return false;
  }
  const nextThur = getClosestDayOfLastWeek('Thur', 7);

  const slotDate = new Date(slotDay);
  const isValid =
    slotDate.setHours(0, 0, 0, 0) >= nextThur.setHours(0, 0, 0, 0);
  return isValid;
}

export function timeSlotValidator(slotTime) {
  if (!slotTime) {
    return false;
  }
  const slotDate = new Date(slotTime);
  const startTime = new Date(
    slotDate.getFullYear(),
    slotDate.getMonth(),
    slotDate.getDate(),
    8,
    0,
    0
  );
  const endTime = new Date(
    slotDate.getFullYear(),
    slotDate.getMonth(),
    slotDate.getDate(),
    13,
    0,
    0
  );
  const isValid =
    slotDate.getTime() >= startTime.getTime() &&
    slotDate.getTime() < endTime.getTime();
  return isValid;
}
