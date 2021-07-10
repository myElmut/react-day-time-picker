import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChevronLeft,
  faChevronRight,
  faCalendarDay,
  faClock,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const propTypes = {
  className: PropTypes.string
};

export const PrevIcon = ({ className }) => (
  <FontAwesomeIcon icon={faChevronLeft} className={className} />
);
PrevIcon.propTypes = propTypes;

export const NextIcon = ({ className }) => (
  <FontAwesomeIcon icon={faChevronRight} className={className} />
);
NextIcon.propTypes = propTypes;

export const DayIcon = ({ className }) => (
  <FontAwesomeIcon
    size="lg"
    color="#FF9656"
    icon={faCalendarDay}
    className={className}
  />
);
DayIcon.propTypes = propTypes;

export const ClockIcon = ({ className }) => (
  <FontAwesomeIcon
    size="lg"
    color="#FF9656"
    icon={faClock}
    className={className}
  />
);
ClockIcon.propTypes = propTypes;

export const SuccessIcon = ({ className }) => (
  <FontAwesomeIcon size="lg" icon={faCheckCircle} className={className} />
);
SuccessIcon.propTypes = propTypes;

export const FailedIcon = ({ className }) => (
  <FontAwesomeIcon size="lg" icon={faExclamationCircle} className={className} />
);
FailedIcon.propTypes = propTypes;
