// import format from 'date-fns/format';
// import parseISO from 'date-fns/parseISO';
import {
  isToday,
  getHours,
  addHours,
  addMinutes,
  addDays,
  parseISO,
  format
} from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';

// import { utcToZonedTime, toDate } from 'date-fns-tz';
function generateTimeSlots(selectedDate, slotSizeMinutes) {
  const today = isToday(selectedDate);

  let start = selectedDate;
  if (today) {
    const now = new Date();
    const offsetHours = getHours(now);

    /*
     * "Pad" the start time with the amount of hours of the current time, to
     * prevent rendering time slots of the past
     */
    start = addHours(start, offsetHours);

    /*
     * The start positions might still be in the past in terms of minutes
     * So "pad" the start time with the slot size, to prevent rendering time
     * slots of the past
     */
    while (start <= now) {
      start = addMinutes(start, slotSizeMinutes);
    }
  }

  const end = addDays(selectedDate, 1);

  let slot = start;
  let timeSlots = [];
  while (slot < end) {
    timeSlots.push(slot);
    slot = addMinutes(slot, slotSizeMinutes);
  }

  timeSlots = timeSlots.map(slot => {
    const formatSlot = format(slot, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    // const timeZone = 'Europe/Berlin'
    // const zonedDate = utcToZonedTime(date, timeZone)
    return {
      deliveryDate: formatSlot,
      startHour: format(slot, 'HH:mm'),
      endHour: format(addMinutes(slot, slotSizeMinutes), 'HH:mm'),
      rank: '',
      slotCode: '',
      slotStatus: 'O',
      tariffLevel: ''
    };
  });

  return timeSlots;
}

export default generateTimeSlots;
