import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../constants';

export const Wrapper = styled(TouchableOpacity)<{ completed?: boolean }>`
  height: 50px;
  width: 100%;

  flex-direction: row;
  align-items: center;

  ${({ completed }) => completed && `background-color: ${colors.disabled}`};
`;
