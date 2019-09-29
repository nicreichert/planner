import * as React from 'react';
import { CheckBoxProps, TextInputProps, View } from 'react-native';
import { PickerProps } from 'react-native-picker-select';
import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { colors } from '../../../constants/theme';
import { Checkbox, CheckboxInterface } from './components/Checkbox';
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
      padding-bottom: 10px;
    `}

  ${space};
`;

const Spacer = styled(View)<SpaceProps>`
  ${space};
`;

type InputTypes = TextInterface | PickerInterface | CheckboxInterface;

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
      {(() => {
        switch (type) {
          case InputType.PICKER:
            return <Picker {...(rest as PickerProps)} />;
          default:
            return <Text {...(rest as TextInputProps)} />;
        }
      })()}
    </Wrapper>
  );
};
