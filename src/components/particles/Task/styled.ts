import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../constants/theme';

export const Wrapper = styled(TouchableOpacity)<{ complete?: boolean }>`
  height: 50px;

  flex: 1;
  flex-direction: row;
  align-items: center;

  border-color: ${colors.primary};
  border-width: 1px;
  border-radius: 5px;

  margin-bottom: 5px;

  ${({ complete }) => complete && `background-color: ${colors.disabled}`};
`;

export const TaskName = styled(Text)`
  color: ${colors.primaryText};
`;
