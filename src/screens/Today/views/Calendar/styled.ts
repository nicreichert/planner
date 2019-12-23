import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { height, HeightProps, left, LeftProps, top, TopProps } from 'styled-system'
import { colors } from '~planner/constants'

export const HEIGHT = 60
export const WIDTH = 100

export const Wrapper = styled(View)`
  position: relative;
  padding: 0 5px;
`

export const HourEntry = styled(View)`
  border-top-width: 0.5px;
  border-top-color: ${colors.primary};

  margin-left: 5px;
  margin-right: 5px;

  height: ${HEIGHT}px;

  flex: 1;
  flex-direction: row;
`

export const TaskEntry = styled(TouchableOpacity)<HeightProps & TopProps & LeftProps>`
  border-radius: 7px;

  justify-content: center;
  align-items: center;

  border-width: 0.5px;
  border-color: ${colors.primary};
  background-color: ${colors.primary}77;

  width: ${WIDTH}px;

  position: absolute;

  ${height};
  ${top};
  ${left};
`
