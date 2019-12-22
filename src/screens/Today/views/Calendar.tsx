import { Moment } from 'moment'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import styled from 'styled-components'
import { HeightProps } from 'styled-system'
import { Row, SmallText } from '~planner/components'
import { colors } from '~planner/constants'
import { selectTasksForDay } from '~planner/data'
import { Task } from '~planner/types'
import { formatTime, times } from '~planner/utils'

const HEIGHT = 60

const Wrapper = styled(View)`
  padding: 0 5px;
`

const HourEntry = styled(View)`
  border-top-width: 0.5px;
  border-top-color: ${colors.primary};

  margin-left: 5px;
  margin-right: 5px;

  height: ${HEIGHT}px;

  flex: 1;
  flex-direction: row;

  z-index: 0;

  position: relative;
`

const TaskEntry = styled(TouchableOpacity)<HeightProps>`
  border-radius: 7px;

  justify-content: center;
  align-items: center;

  border-width: 0.5px;
  border-color: ${colors.primary};
  background-color: ${colors.primary}77;

  margin-right: 5px;

  height: 100%;
`

interface Props {
  activeDay: Moment
  tasks: Task[]
}

const tasksStartsAtHour = (hour: number) => (task: Task) => task.startTime.get('hour') === hour

const taskTopAndHeight = ({ startTime, endTime }: Task) => {
  const top = startTime.get('minute')

  return {
    transform: [{ translateY: top }],
    height: endTime.diff(startTime, 'minutes') || HEIGHT - top,
    zIndex: 20,
    elevation: 20,
  }
}

export const Calendar = ({ activeDay, tasks }: Props) => {
  const { navigate } = useNavigation()
  const todaysTasks = selectTasksForDay(tasks, activeDay)

  return (
    <Wrapper>
      {times(24, index => (
        <Row key={index} alignItems="flex-start">
          <SmallText style={{ transform: [{ translateY: -6 }] }}>{formatTime(index)}</SmallText>
          <HourEntry>
            {todaysTasks.filter(tasksStartsAtHour(index)).map(task => (
              <View key={`${task.name}-${task.id}`} style={taskTopAndHeight(task)}>
                <TaskEntry
                  // @ts-ignore
                  onPress={() => navigate('TaskDetailsModal', { taskId: task.id, activeDay })}
                >
                  <SmallText px={20}>{task.name}</SmallText>
                </TaskEntry>
              </View>
            ))}
          </HourEntry>
        </Row>
      ))}
    </Wrapper>
  )
}
