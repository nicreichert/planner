import { Text } from 'react-native'
import styled from 'styled-components'
import { space, SpaceProps, textAlign, TextAlignProps } from 'styled-system'
import { colors } from '~planner/constants'

interface Alt extends SpaceProps, TextAlignProps {
  alt?: boolean
  bold?: boolean
}

export const BaseText = styled(Text)<Alt>`
  color: ${({ alt }) => (alt ? colors.white : colors.primaryText)};
  ${space};
  ${textAlign};
  ${({ bold }) => bold && 'font-weight: bold'};
  font-size: 16px;
  /* stylelint-disable font-family-no-missing-generic-family-keyword */
  font-family: Roboto-Light;
  /* stylelint-enable font-family-no-missing-generic-family-keyword */
`

export const SmallText = styled(BaseText)`
  font-size: 12px;
`

export const MediumText = styled(BaseText)`
  font-size: 18px;
`

export const LargeText = styled(BaseText)`
  font-size: 28px;
`
