/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    addMonths,
    subMonths,
    isSameMonth,
    format,
    isToday,
    isAfter
} from 'date-fns';
import fr from 'date-fns/locale/fr';

import { PrevIcon, NextIcon } from '../Icons';

import {
  Grid,
  Wrapper,
  MonthYear,
  DaysOfWeek,
  DaysOfMonth,
 } from './Layout';
import { WeekDays, WeekDay, WEEK_DAYS } from './WeekDays';
import { MonthDays, MonthDay } from './MonthDays';

import {
  MonthPicker,
  PrevMonth,
  NextMonth,
  CurrentMonth,
  FakeCurrentMonth,
} from './MonthPicker';

import { Calendar, FakeCalendar } from './Calendar';

import generateDays from './generate-days';

import Tippy from '@tippyjs/react';

function Root({ slots, validator, pickDay, maxWeeks, fromDate }) {

  const [month, setMonth] = useState(new Date());
  const [fakeMonth, setFakeMonth] = useState(month);
  const [animation, setAnimation] = useState('');

  const [startDay, days] = generateDays(month);
  const [fakeStartDay, fakeDays] = generateDays(fakeMonth);

  const isAnimating = !!animation;

  // Handlers
  const handleNextMonth = () => {
    if (isAnimating) {
      return;
    }

    const next = addMonths(month, 1);
    setMonth(next);
    setAnimation('next');
  };

  const handlePrevMonth = () => {
    if (isAnimating) {
      return;
    }

    const prev = subMonths(month, 1);
    setMonth(prev);
    setAnimation('prev');
  };

  const handleAnimationEnd = () => {
    const newFakeMonth = animation === 'prev'
        ? subMonths(fakeMonth, 1)
        : addMonths(fakeMonth, 1);

    setFakeMonth(newFakeMonth);
    setAnimation('');
  };

  const handlePickDay = (day) => {
    if (isAnimating) {
      return;
    }

    pickDay(day);
  };

  useEffect(() => {
    //if there is not a day available in this month switch to the next
    const isAvailableDays = days.some((day) => {
        const sameMonth = isSameMonth(day, startDay);
        if (sameMonth) {
            return validator ? validator(slots, day, maxWeeks, fromDate) : true
        }
        return false;
        
    })
    if (!isAvailableDays) {
        handleNextMonth()
    }
  }, [])

  const disclaimer = "Ce jour de livraison ne peut pas être sélectionné en ligne. Contactez notre service client à ouaf@elmut.fr, nous nous ferons une joie de trouver une solution qui vous convienne"

  return (
    <Grid>
      <MonthYear>
        <MonthPicker>
          <PrevMonth disabled={isAnimating} onClick={handlePrevMonth}>
            <PrevIcon />
          </PrevMonth>

          <Wrapper>
            <CurrentMonth animation={animation}>
              {format(month, 'MMMM yyyy', { locale: fr })}
            </CurrentMonth>

            <FakeCurrentMonth animation={animation}>
              {format(fakeMonth, 'MMMM yyyy', { locale: fr })}
            </FakeCurrentMonth>
          </Wrapper>

          <NextMonth disabled={isAnimating} onClick={handleNextMonth}>
            <NextIcon />
          </NextMonth>
        </MonthPicker>
      </MonthYear>

      <Wrapper>
        <Calendar animation={animation} onAnimationEnd={handleAnimationEnd}>
          <DaysOfWeek>
            <WeekDays>
              { WEEK_DAYS.map((weekDay) => {return <WeekDay key={weekDay}>{weekDay}</WeekDay>; })}
            </WeekDays>
          </DaysOfWeek>

          <MonthDays>
            {days.map((day) => {
              const sameMonth = isSameMonth(day, startDay);
              if (!sameMonth) {
                return <MonthDay key={day} />;
              }

              const formatted = format(day, 'd');
              const today = isToday(day);
              const isValid = validator ? validator(slots, day, maxWeeks, fromDate) : true;
              const afterToday = isAfter(day, new Date()) && !isValid
              return (
                <Tippy key={day} content={disclaimer} trigger='click' onShow={()=> !!afterToday}>
                    <MonthDay
                        isValid={isValid}
                        isToday={today}
                        afterToday={afterToday}
                        onClick={() => isValid && handlePickDay(day)}
                        >    
                        {formatted}
                    </MonthDay>
                </Tippy>
              );
            })}
          </MonthDays>
        </Calendar>

        <FakeCalendar animation={animation}>
          <DaysOfWeek>
            <WeekDays>
              {WEEK_DAYS.map((weekDay) => { return <WeekDay key={weekDay}>{weekDay}</WeekDay>; })}
            </WeekDays>
          </DaysOfWeek>

          <DaysOfMonth>
            <MonthDays>
              {fakeDays.map((fakeDay) => {
                const sameMonth = isSameMonth(fakeDay, fakeStartDay);
                if (!sameMonth) {
                  return <MonthDay key={fakeDay} />;
                }

                const formatted = format(fakeDay, 'd');
                const today = isToday(fakeDay);
                const isValid = validator ? validator(slots, fakeDay) : true;
                const afterToday = isAfter(fakeDay, new Date()) && !isValid

                return (
                    <MonthDay
                        key={fakeDay}
                        disabled={!sameMonth}
                        isValid={isValid}
                        isToday={today}
                        afterToday={afterToday}>
                        {formatted}
                    </MonthDay>
                );
              })}
            </MonthDays>
          </DaysOfMonth>
        </FakeCalendar>
      </Wrapper>
    </Grid>
  );
}

Root.propTypes = {
  validator: PropTypes.func,
  pickDay: PropTypes.func.isRequired,
  slots: PropTypes.array,
  maxWeeks: PropTypes.number,
  fromDate: PropTypes.string,
};

export default Root;
