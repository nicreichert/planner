import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../constants';

export const Wrapper = styled(View)`
  border-color: ${colors.primary};
  border-width: 1px;

  margin-bottom: 10px;

  border-right-width: 0;
  border-left-width: 0;

  flex-direction: row;

  height: 30px;

  justify-content: center;
  align-items: center;
`;

export const Tab = styled(TouchableOpacity)<{ active?: boolean }>`
  flex: 1;
  height: 100%;
  padding: 0 10px;
  align-items: center;
  justify-content: center;

  border-color: ${colors.primary};
  border-width: 1px;
  border-top-width: 0;
  border-bottom-width: 0;

  ${({ active }) => active && `background-color: ${colors.primary}`};
`;
