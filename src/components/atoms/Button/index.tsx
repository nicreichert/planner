import * as React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components';
import { borderRadius, BorderRadiusProps, space, SpaceProps } from 'styled-system';
import { colors } from '~planner/constants';

export const ButtonWrapper = styled(TouchableOpacity)<
SpaceProps & BorderRadiusProps & { alt?: boolean }
>`
  flex: 1;

  background-color: ${({ alt }) => (alt ? colors.primary : colors.transparent)};

  border-color: ${colors.primary};
  border-width: 1px;

  height: 50px;
  padding: 0 20px;

  justify-content: center;
  align-items: center;

  ${space};
  ${borderRadius};
`;

export const ButtonLabel = styled(Text)<{ alt?: boolean }>`
  color: ${({ alt }) => (alt ? colors.white : colors.primaryText)};
  line-height: 18px;
  text-align: center;
`;

interface Props extends TouchableOpacityProps, SpaceProps, BorderRadiusProps {
  label?: string;
  alt?: boolean;
}

export const Button: React.FC<Props> = ({ label, children, ...rest }) => (
  <ButtonWrapper {...rest}>
    <ButtonLabel alt={rest.alt}>{label || children}</ButtonLabel>
  </ButtonWrapper>
);
