import * as React from 'react';
import RNPicker, { PickerProps } from 'react-native-picker-select';
import { colors } from '~planner/constants';
import { InputType } from '../types';

export interface PickerInterface extends PickerProps {
  type: InputType.PICKER;
}

export const Picker: React.FC<PickerProps> = props => {
  return (
    <RNPicker
      {...(props as PickerProps)}
      textInputProps={{ style: { fontSize: 14, color: colors.primaryText } }}
    />
  );
};
