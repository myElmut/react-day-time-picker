import styled from 'styled-components';

export const PopupWrapper = styled.div`
  position: relative;
  text-align: center;
  width: 420px;
  margin: auto;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  background-color: ${props => props.theme.background};
  font-size: 1.1em;
`;
export const PopupDone = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -webkit-box-direction: normal;
  -moz-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  font-size: 1.1em;
`;

export const PopupHeader = styled.header`
  padding: 0.5em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const PopupClose = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 1em;
  color: ${props => props.theme.primary};
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
    color: ${props => props.theme.buttons.disabled.color};
  }
`;
