import { View } from 'react-native';
import styled from 'styled-components';
import {
  alignItems,
  AlignItemsProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from 'styled-system';

export const Row = styled(View)<JustifyContentProps & AlignItemsProps & SpaceProps>`
  flex-direction: row;
  ${justifyContent};
  ${alignItems};
  ${space};
`;
