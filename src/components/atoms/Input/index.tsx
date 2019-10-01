import * as React from 'react';
import { CheckBoxProps, TextInputProps, View } from 'react-native';
import { PickerProps } from 'react-native-picker-select';
import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { colors } from '../../../constants/theme';
import { SmallText } from '../Typography';
import { Checkbox, CheckboxInterface } from './components/Checkbox';
import { NumberInput, NumberInterface } from './components/Number';
import { Picker, PickerInterface } from './components/Picker';
import { Text, TextInterface } from './components/Text';
import { InputType } from './types';

export { InputType } from './types';

const Wrapper = styled(View)<SpaceProps & { picker?: boolean }>`
  height: 50px;
  margin-bottom: 20px;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary};

  ${({ picker }) =>
    picker &&
    css`
      justify-content: flex-end;
      padding-bottom: 5px;
    `}

  ${space};
`;

const Spacer = styled(View)<SpaceProps>`
  ${space};
`;

type InputTypes = TextInterface | PickerInterface | CheckboxInterface | NumberInterface;

interface BaseProps extends SpaceProps {
  type: InputType;
  label?: string;
}

type Props = InputTypes & BaseProps;

export const Input: React.FC<Props> = ({ type, label, ...rest }) => {
  if (type === InputType.CHECKBOX) {
    return (
      <Spacer {...(rest as SpaceProps)}>
        <Checkbox {...(rest as CheckBoxProps)} />
      </Spacer>
    );
  }

  return (
    <Wrapper picker={type === InputType.PICKER}>
      {label && <SmallText>{label}</SmallText>}
      {(() => {
        switch (type) {
          case InputType.PICKER:
            return <Picker {...(rest as PickerProps)} />;
          case InputType.NUMBER:
            return <NumberInput {...(rest as NumberInterface)} />;
          default:
            return <Text {...(rest as TextInputProps)} />;
        }
      })()}
    </Wrapper>
  );
};
