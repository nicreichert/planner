import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../constants/theme';

export const Wrapper = styled(TouchableOpacity)<{ completed?: boolean }>`
  height: 50px;
  min-height: 50px;

  flex-direction: row;
  align-items: center;

  border-color: ${colors.primary};
  border-bottom-width: 0.5px;

  ${({ completed }) => completed && `background-color: ${colors.disabled}`};
`;

export const TaskName = styled(Text)`
  color: ${colors.primaryText};
`;
