/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import generateTimeSlots from './generate-time-slots';

import { List, ListItem, HintWrapper, HintFree, Hint } from './List';
import { useEffect } from 'react';
import { useState } from 'react';

function Root({
  pickedDay,
  slotSizeMinutes,
  validator,
  pickTime,
  slots,
  freeText,
  feesText
}) {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    let newSlots = generateTimeSlots(pickedDay, slotSizeMinutes);
    if (slots && slots.length > 0) {
      newSlots = newSlots.concat(slots);
    }
    preSelectSlot(newSlots);
    setTimeSlots(newSlots);
  }, []);

  // PreSelect if there is one slot
  const preSelectSlot = newSlots => {
    const filterSlots = newSlots.filter(slot => {
      return checkSlot(slot);
    });
    if (filterSlots.length == 1) {
      pickTime(filterSlots[0]);
    }
  };

  //validate slot
  const checkSlot = slot => {
    return validator && !slot.slotCode ? validator(slot.deliveryDate) : true;
  };

  return (
    <List>
      {timeSlots.map(slot => {
        const isValid = checkSlot(slot);
        return (
          <ListItem
            key={slot.slotCode ? slot.slotCode : slot.deliveryDate}
            isValid={isValid}
            onClick={() => isValid && pickTime(slot)}
          >
            <span>
              <span>
                {`${slot.startHour}:00`} {' - '}
              </span>
              <span>{`${slot.endHour}:00`}</span>
            </span>
            <HintWrapper>
              {slot.slotCode ? (
                <Hint>{feesText}</Hint>
              ) : (
                <HintFree>{freeText}</HintFree>
              )}
            </HintWrapper>
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
  slots: PropTypes.array,
  feesText: PropTypes.string,
  freeText: PropTypes.string
};

export default Root;
