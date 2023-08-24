import styled from 'styled-components';

export const MonthDays = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 0;
  font-size: 1.2em;
  font-weight: 300;
  margin: 0;
  padding: 0;
`;

export const MonthDay = styled.li`
  list-style: none;
  display: grid;
  align-items: center;
  margin: 0;
  padding: 0;
  padding: 1em 0;
  border-radius: 50%;
  transition: all 0.25s ease;
  position: relative;
  font-weight: ${props => (props.isToday ? 'bold' : 'inherit')};
  color: ${props => (props.isToday ? props.theme.secondary : 'inherit')};
  opacity: ${props => (props.isValid ? 1 : 0.3)};

  :hover {
    cursor: ${props =>
      props.isValid || props.afterToday ? 'pointer' : 'inherit'};
    color: ${props => (props.isValid ? props.theme.primary : 'inherit')};
  }

  ${props =>
    props.afterToday &&
    `
        ::after {
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            background: #681a36;
            border-radius: 50%;
            position: absolute;
            bottom: 13px;
            left: 27px;
            opacity: 1;
            z-index: 10;
        }
    `};
`;
