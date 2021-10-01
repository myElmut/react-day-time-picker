/**
 * A validator function to determine if a time slot can be selected by the user
 * or not.
 *
 * @param {Date} slotTime - a time slot
 *
 * @return {Boolan} If the time slot is valid or not.
//  */
// export function timeSlotValidator(slotTime, slots) {
//     // console.log('slots', slots);
//     if (!slotTime) {
//         return false;
//     }
//   const eveningTime = new Date(
//     slotTime.getFullYear(),
//     slotTime.getMonth(),
//     slotTime.getDate(),
//     18,
//     0,
//     0
//   );

//   const isValid = slotTime.getTime() > eveningTime.getTime();
//   return isValid;
// }

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
