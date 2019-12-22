import { View } from 'react-native'
import styled from 'styled-components'
import {
  alignItems,
  AlignItemsProps,
  flexWrap,
  FlexWrapProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from 'styled-system'

export const Row = styled(View)<FlexWrapProps & JustifyContentProps & AlignItemsProps & SpaceProps>`
  flex-direction: row;
  ${flexWrap};
  ${justifyContent};
  ${alignItems};
  ${space};
`
