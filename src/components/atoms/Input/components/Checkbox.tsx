import * as React from 'react';
import { CheckBoxProps, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../../constants/theme';
import { InputType } from '../types';

export interface CheckboxInterface extends CheckBoxProps {
  type: InputType.CHECKBOX;
}

const Wrapper = styled(TouchableOpacity)<{ active: boolean }>`
  height: 20px;
  width: 20px;

  border-width: 1px;
  border-color: ${colors.primary};
  border-radius: 5px;

  ${({ active }) => active && `backgroundColor: ${colors.primary}`};
`;

export const Checkbox: React.FC<CheckBoxProps> = ({ disabled, onChange }) => {
  return (
    <Wrapper onPress={() => onChange!(!disabled)} active={!disabled}>
      {disabled ? null : <Text style={{ color: colors.primaryText }}>V</Text>}
    </Wrapper>
  );
};
