/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import fr from 'date-fns/locale/fr';

import { ThemeProvider } from 'styled-components';

import { PopupWrapper, Popup, PopupHeader, PopupClose } from './Popup';
import { ConfirmButton } from './Confirm';
import { DayIcon, ClockIcon, SuccessIcon, FailedIcon } from './Icons';
import { Success, Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { preventPastDays } from './validators';

function DayTimePicker({
  timeSlotValidator,
  timeSlotSizeMinutes,
  isLoading,
  isDone,
  onConfirm,
  doneText,
  theme
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [showPickTime, setShowPickTime] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePickDay = day => {
    setPickedDay(day);
    setShowPickTime(true);
  };

  const handlePickTime = time => {
    setPickedTime(time);
    setShowPickTime(false);
    setShowConfirm(true);
    handleConfirm(time);
  };

  const handleClosePickTime = () => {
    setShowPickTime(false);
  };

  const handleConfirm = () => {
    console.log('handle confirm', pickedTime);
    onConfirm(pickedTime);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setShowPickTime(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PopupWrapper>
        <Calendar validator={preventPastDays} pickDay={handlePickDay} />

        {showPickTime && (
          <Popup>
            <PopupHeader>
              <p style={{ fontSize: '20px' }}>
                <DayIcon />{' '}
                {dateFns.format(pickedDay, 'dddd, Do MMMM YYYY', {
                  locale: fr
                })}
              </p>
              <p>
                <PopupClose onClick={handleClosePickTime}>Retour</PopupClose>
              </p>
            </PopupHeader>

            <TimeSlots
              pickedDay={pickedDay}
              slotSizeMinutes={timeSlotSizeMinutes}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
            />
          </Popup>
        )}

        {showConfirm && (
          <Popup>
            <PopupHeader>
              <p style={{ fontSize: '20px' }}>
                <DayIcon />{' '}
                {dateFns.format(pickedTime, 'dddd Do MMMM YYYY', {
                  locale: fr
                })}
              </p>

              <p style={{ fontSize: '24px' }}>
                <ClockIcon /> {dateFns.format(pickedTime, 'HH:mm')}
              </p>

              {!isDone ? (
                <Success>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>
                      {dateFns.format(pickedDay, 'dddd', {
                        locale: fr
                      })}
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
          </Popup>
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
