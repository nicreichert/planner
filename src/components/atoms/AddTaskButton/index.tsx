import { Moment } from 'moment'
import * as React from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components'
import { colors } from '~planner/constants'
import { ButtonIcon } from '../ButtonIcon'
import { IconType } from '../Icon'

export const Wrapper = styled(View)`
  position: absolute;
  bottom: 5px;
  right: 20px;
  border-radius: 50px;
  background-color: ${colors.white};
`

interface Props {
  activeDay: Moment
}

export const AddTaskButton = ({ activeDay }: Props) => {
  const { navigate } = useNavigation()
  return (
    <Wrapper>
      <ButtonIcon
        onPress={() => navigate('CreateTaskModal', { activeDay })}
        type={IconType.PLUS}
        color={colors.primary}
        size={40}
      />
    </Wrapper>
  )
}
