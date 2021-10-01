/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import generateTimeSlots from './generate-time-slots';

import { List, ListItem } from './List';

function Root({ pickedDay, slotSizeMinutes, validator, pickTime, slots }) {
  const timeSlots =
    slots && slots.length > 0
      ? slots
      : generateTimeSlots(pickedDay, slotSizeMinutes);

  return (
    <List>
      {timeSlots.map(slot => {
        const isValid =
          validator && slots.length == 0 ? validator(slot.deliveryDate) : true;
        return (
          <ListItem
            key={slot.slotCode ? slot.slotCode : slot.deliveryDate}
            isValid={isValid}
            onClick={() => isValid && pickTime(slot)}
          >
            <span>
              {`${slot.startHour}:00`} {' - '}
            </span>
            <span>{`${slot.endHour}:00`}</span>
          </ListItem>
        );
      })}
    </List>
  );
}

Root.propTypes = {
  pickedDay: PropTypes.instanceOf(Date),
  slotSizeMinutes: PropTypes.number.isRequired,
  validator: PropTypes.func,
  pickTime: PropTypes.func.isRequired,
  slots: PropTypes.array
};

export default Root;
