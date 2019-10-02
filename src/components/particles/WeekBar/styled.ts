import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components';
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
