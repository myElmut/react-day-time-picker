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
import { DayIcon, ClockIcon, InfoIcon, ShipIcon, FailedIcon } from './Icons';
import { Success, Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { dayValidator } from './validators';

function DayTimePicker({
  timeSlotValidator,
  daySlotValidator,
  timeSlotSizeMinutes,
  value,
  isLoading,
  isDone,
  onConfirm,
  slots,
  onReset,
  doneText,
  freeText,
  feesText,
  maxWeeks,
  fromDate,
  theme
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState({});
  const [showPickTime, setShowPickTime] = useState(false);
  const [daySlots, setDaySlots] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (daySlotValidator) {
      if (value && daySlotValidator(value.deliveryDate)) {
        handlePickTime(value);
      }
    }
  }, []);

  const handlePickDay = day => {
    prepareDaySlots(day, slots);
    setPickedDay(day);
    setShowPickTime(true);
  };

  const prepareDaySlots = (day, slots) => {
    if (slots) {
      const filterSlots = slots.filter(slot => {
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
          daySlots={daySlots}
          validator={dayValidator}
          pickDay={handlePickDay}
          maxWeeks={maxWeeks}
          fromDate={fromDate}
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
              freeText={freeText}
              feesText={feesText}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
            />
          </Popup>
        )}

        {showConfirm && (
          <PopupDone>
            <PopupHeader>
              <p style={{ fontSize: '18px', margin: '8px 0 0 0' }}>
                <DayIcon />{' '}
                {format(parseISO(pickedTime.deliveryDate), 'dd MMMM yyyy', {
                  locale: fr
                })}
              </p>

              <p style={{ fontSize: '24px', margin: '8px 0 0 0' }}>
                <ClockIcon />{' '}
                {`${pickedTime.startHour}:00 - ${pickedTime.endHour}:00`}
              </p>
              <p style={{ fontSize: '18px', margin: '8px 0 0 0' }}>
                <ShipIcon />{' '}
                {pickedTime.slotCode ? (
                  <span>{feesText}</span>
                ) : (
                  <span>Livraison offerte</span>
                )}
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
  daySlotValidator: PropTypes.func,
  maxWeeks: PropTypes.number,
  fromDate: PropTypes.string,
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
  cautionText: PropTypes.string,
  freeText: PropTypes.string,
  feesText: PropTypes.string,
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
  maxWeeks: 21,
  fromDate: '',
  confirmText: 'Confirmer',
  loadingText: 'En cours..',
  doneText:
    'sera votre jour de livraison habituel. Vous pouvez le modifier maintenant ou à tout moment après votre commande',
  cautionText:
    'Attention, entre le Jeudi 8 décembre et le Samedi 24 décembre, les colis en livraison gratuite (entre 8h et 13h) seront exceptionnellement livrés entre 8h et 18h. Vous recevrez un email en amont de la livraison qui vous indiquera un créneau plus précis.',
  freeText: 'Offert',
  feesText: '+4,95€ / Livraison',
  theme: {
    primary: '#C15265',
    secondary: '#681A36',
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
        color: '#22C55E'
      },
      failed: {
        color: '#eb7260'
      }
    }
  }
};

export default DayTimePicker;
