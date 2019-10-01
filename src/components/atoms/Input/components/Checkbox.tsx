import * as React from 'react';
import { CheckBoxProps, TouchableOpacity } from 'react-native';
import { colors } from '../../../../constants/theme';
import { Icon, IconType } from '../../Icon';
import { InputType } from '../types';

export interface CheckboxInterface extends CheckBoxProps {
  type: InputType.CHECKBOX;
}

export const Checkbox: React.FC<CheckBoxProps> = ({ disabled, onChange }) => {
  return (
    <TouchableOpacity onPress={() => onChange!(!disabled)}>
      <Icon size={25} color={colors.primary} type={disabled ? IconType.CIRCLE : IconType.SUCCESS} />
    </TouchableOpacity>
  );
};
