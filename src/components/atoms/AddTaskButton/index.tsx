import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '~planner/constants';
import { Icon, IconType } from '../Icon';

export const Wrapper = styled(TouchableOpacity)`
  position: absolute;
  bottom: 5px;
  right: 20px;
  border-radius: 50px;
  background-color: ${colors.white};
`;

interface Props {
  onPress: () => void;
}

export const AddTaskButton = ({ onPress }: Props) => (
  <Wrapper onPress={onPress}>
    <Icon type={IconType.PLUS} color={colors.primary} size={40} />
  </Wrapper>
);
