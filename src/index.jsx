/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';

import { ThemeProvider } from 'styled-components';

import {
  PopupWrapper,
  Popup,
  PopupHeader,
  PopupClose,
  PopupDone
} from './Popup';
import { ConfirmButton } from './Confirm';
import { DayIcon, ClockIcon } from './Icons';
import { Success, Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { preventPastDays, dayValidator } from './validators';

function DayTimePicker({
  timeSlotValidator,
  timeSlotSizeMinutes,
  value,
  isLoading,
  isDone,
  onConfirm,
  slots,
  onReset,
  doneText,
  theme
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState({});
  const [showPickTime, setShowPickTime] = useState(false);
  const [daySlots, setDaySlots] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (value) {
      handlePickTime(value);
    }
  }, []);

  const handlePickDay = day => {
    prepareDaySlots(day, slots);
    setPickedDay(day);
    setShowPickTime(true);
  };

  const prepareDaySlots = (day, slots) => {
    if (slots) {
      const filterSlots = slots.filter(function(slot) {
        return new Date(slot.deliveryDate).getDate() === day.getDate();
      });
      filterSlots.sort(
        (firstDate, secondDate) => +firstDate.startHour - +secondDate.startHour
      );
      setDaySlots(filterSlots);
    }
  };

  const handlePickTime = time => {
    setPickedTime(time);
    if (!pickedDay) {
      setPickedDay(new Date(time.deliveryDate));
    }
    setShowPickTime(false);
    setShowConfirm(true);
    handleConfirm(time);
  };

  const handleClosePickTime = () => {
    setShowPickTime(false);
    if (onReset) {
      onReset();
    }
  };

  const handleConfirm = pickedTime => {
    if (onConfirm) {
      onConfirm(pickedTime);
    }
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    handleClosePickTime();
  };

  return (
    <ThemeProvider theme={theme}>
      <PopupWrapper>
        <Calendar
          slots={slots}
          validator={preventPastDays && dayValidator}
          pickDay={handlePickDay}
        />

        {showPickTime && (
          <Popup>
            <PopupHeader>
              <p style={{ fontSize: '20px' }}>
                <DayIcon />{' '}
                {format(pickedDay, 'dd MMMM yyyy', {
                  locale: fr
                })}
                {/* {pickedDay} */}
              </p>
              <p>
                <PopupClose onClick={handleClosePickTime}>Retour</PopupClose>
              </p>
            </PopupHeader>

            <TimeSlots
              pickedDay={pickedDay}
              slotSizeMinutes={timeSlotSizeMinutes}
              slots={daySlots}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
            />
          </Popup>
        )}

        {showConfirm && (
          <PopupDone>
            <PopupHeader>
              <p style={{ fontSize: '20px' }}>
                <DayIcon />{' '}
                {format(parseISO(pickedTime.deliveryDate), 'dd MMMM yyyy', {
                  locale: fr
                })}
              </p>

              <p style={{ fontSize: '24px' }}>
                <ClockIcon />{' '}
                {`${pickedTime.startHour}:00 - ${pickedTime.endHour}:00`}
              </p>

              {!isDone && pickedDay ? (
                <Success>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>
                      {capitalizeFirstLetter(
                        format(pickedDay, 'EEEE', {
                          locale: fr
                        })
                      )}
                    </span>{' '}
                    {doneText}
                  </p>
                  <p>
                    <PopupClose
                      disabled={isLoading}
                      onClick={handleCloseConfirm}
                    >
                      Modifier
                    </PopupClose>
                  </p>
                </Success>
              ) : null}
            </PopupHeader>
          </PopupDone>
        )}
      </PopupWrapper>
    </ThemeProvider>
  );
}

DayTimePicker.propTypes = {
  timeSlotValidator: PropTypes.func,
  timeSlotSizeMinutes: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  isDone: PropTypes.bool,
  err: PropTypes.string,
  onConfirm: PropTypes.func,
  value: PropTypes.shape({
    deliveryDate: PropTypes.string,
    endHour: PropTypes.string,
    rank: PropTypes.string,
    slotCode: PropTypes.string,
    slotStatus: PropTypes.string,
    startHour: PropTypes.string,
    tariffLevel: PropTypes.string
  }),
  onReset: PropTypes.func,
  slots: PropTypes.array,
  doneText: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    background: PropTypes.string,
    buttons: PropTypes.shape({
      disabled: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string
      }),
      confirm: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string,
        hover: PropTypes.shape({
          color: PropTypes.string,
          background: PropTypes.string
        })
      })
    })
  })
};

DayTimePicker.defaultProps = {
  confirmText: 'Confirmer',
  loadingText: 'En cours..',
  doneText:
    'sera votre jour de livraison habituel. Vous pouvez le modifier maintenant ou à tout moment après votre commande',
  theme: {
    primary: '#274E84',
    secondary: '#FF9656',
    background: '#fff',
    buttons: {
      disabled: {
        color: '#333',
        background: '#dfdfdf'
      },
      confirm: {
        color: '#fff',
        background: '#3a9ad9',
        hover: {
          color: '',
          background: '#3a9ad9d6'
        }
      }
    },
    feedback: {
      success: {
        color: '#86CB92'
      },
      failed: {
        color: '#eb7260'
      }
    }
  }
};

export default DayTimePicker;
