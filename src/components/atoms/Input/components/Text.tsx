import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components';
import { InputType } from '../types';

const Field = styled(TextInput)`
  flex: 1;
`;

export interface TextInterface extends TextInputProps {
  type: InputType.TEXT;
}

export const Text: React.FC<TextInputProps> = props => {
  return <Field {...props} />;
};
