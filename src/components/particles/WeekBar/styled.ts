import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components';
import { ButtonWrapper } from '../..';
import { colors } from '../../../constants/theme';

export const Bar = styled(GestureRecognizer)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 70px;

  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.primaryText};
`;

export const DayWrapper = styled(ButtonWrapper)`
  flex-grow: 0;
  padding: 0;

  min-height: 45px;
  min-width: 45px;

  border-radius: 10px;
`;
