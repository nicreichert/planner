import { Moment } from 'moment'
import * as React from 'react'
import { View } from 'react-native'
import { BaseText, Icon, IconType, Input, InputType, SmallText } from '~planner/components'
import { colors } from '~planner/constants'
import { Task as TaskInterface } from '~planner/types'
import { Wrapper } from './styled'

interface Props {
  activeDay: Moment
  onOpenDetails: (task: TaskInterface) => void
  onToggleComplete: (disabled: boolean) => void
  task: TaskInterface
}

export const Task = ({ activeDay, onOpenDetails, onToggleComplete, task }: Props) => {
  const completed = Boolean(task.completed.find(c => c.isSame(activeDay, 'day')))

  return (
    <Wrapper completed={completed} onPress={() => onOpenDetails(task)}>
      <Input
        type={InputType.CHECKBOX}
        disabled={!completed}
        onChange={onToggleComplete}
        m={'0 10px'}
      />
      <View>
        <SmallText>
          {task.startTime.format('HH:mm')} - {task.endTime.format('HH:mm')}
        </SmallText>
        <BaseText>{task.name}</BaseText>
      </View>
      <View style={{ marginLeft: 'auto', marginRight: 10 }}>
        <Icon type={IconType.ARROW} size={20} color={colors.primaryText} />
      </View>
    </Wrapper>
  )
}
