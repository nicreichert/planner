import { View } from 'react-native'
import styled, { css } from 'styled-components'
import { colors } from '~planner/constants'

export const HeaderStyle = css`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 5px;

  width: 100%;
  height: 70px;

  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.primaryText};
`

export const Header = styled(View)`
  ${HeaderStyle};
`
