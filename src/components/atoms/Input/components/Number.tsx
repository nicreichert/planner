import * as React from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { colors } from '../../../../constants/theme';
import { LargeText } from '../../Typography';
import { InputType } from '../types';

const Wrapper = styled(View)`
  flex-direction: row;
`;

const Field = styled(TextInput)`
  flex-grow: 1;
  color: ${colors.primaryText};
`;

const Button = styled(TouchableOpacity)<SpaceProps>`
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  ${space};
`;

const ButtonWrapper = styled(View)`
  flex-shrink: 1;
  flex-direction: row;
`;

export interface NumberInterface extends TextInputProps {
  type: InputType.NUMBER;
  onChangeNumber: (x: number) => void;
}

export const NumberInput: React.FC<NumberInterface> = ({ onChangeNumber, value, ...rest }) => (
  <Wrapper>
    <Field {...rest} value={value} onChangeText={t => onChangeNumber(Number(t))} />
    <ButtonWrapper>
      <Button onPress={() => onChangeNumber(Number(value) - 1)}>
        <LargeText>-</LargeText>
      </Button>
      <Button onPress={() => onChangeNumber(Number(value) + 1)}>
        <LargeText>+</LargeText>
      </Button>
    </ButtonWrapper>
  </Wrapper>
);
