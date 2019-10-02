import { View } from 'react-native';
import styled from 'styled-components';
import { alignItems, AlignItemsProps, justifyContent, JustifyContentProps } from 'styled-system';

export const Row = styled(View)<JustifyContentProps & AlignItemsProps>`
  flex-direction: row;
  ${justifyContent};
  ${alignItems};
`;
