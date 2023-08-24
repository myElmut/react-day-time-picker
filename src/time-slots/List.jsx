import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 1em;
  list-style: none;
  margin: 0;
  padding: 1em;
  height: 355px;
  overflow: auto;
  border-top: 1px solid #f0f0f0;
  &:before {
    content: 'Veuillez cliquer sur le créneau de votre choix';
    font-size: 14px;
  }
`;

export const ListItem = styled.li`
  padding: 0.75em 1.5em;
  border: 1px solid;
  border-radius: 50px;
  margin: 0;
  display: ${props => (props.isValid ? 'flex' : 'none')};
  justify-content: space-between;
  :hover {
    cursor: ${props => (props.isValid ? 'pointer' : 'inherit')};
    background: ${props => (props.isValid ? props.theme.primary : 'inherit')};
    color: ${props => (props.isValid ? 'white!important' : 'inherit')};
  }
`;

export const HintWrapper = styled.div`
  margin: 0;
  font-size: 14px;
  margin-top: 3px;
`;

export const HintFree = styled.span`
  padding: 0.5em;
  color: ${props => props.theme.feedback.success.color};
  border-radius: 5px;
  ${ListItem}:hover & {
    color: white;
  }
`;
export const Hint = styled.span`
  background: ${props =>
    props.isValid ? props.theme.feedback.success.color : 'inherit'};
  color: slategrey;
  font-style: italic
  ${ListItem}:hover & {
    color: white;
  }
`;
