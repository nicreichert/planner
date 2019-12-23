import { Moment } from 'moment'
import * as React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Row, SmallText } from '~planner/components'
import { selectTasksForDay } from '~planner/data'
import { Task } from '~planner/types'
import { formatTime, times } from '~planner/utils'
import { HEIGHT, HourEntry, TaskEntry, WIDTH, Wrapper } from './styled'

interface Props {
  activeDay: Moment
  tasks: Task[]
}

const tasksStartsAtHour = (hour: number) => (task: Task) => task.startTime.get('hour') === hour

const getTaskStyle = ({ startTime, endTime }: Task, index: number) => {
  const top = (startTime.get('minute') / 60) * HEIGHT

  return {
    top: startTime.get('hour') * HEIGHT + top,
    left: 40 + index * (WIDTH + 10),
    height: (endTime.diff(startTime, 'minutes') / 60) * HEIGHT || HEIGHT - top,
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
          <HourEntry />
        </Row>
      ))}
      {times(24, index =>
        todaysTasks.filter(tasksStartsAtHour(index)).map((task, i) => (
          <TaskEntry
            key={task.id}
            {...getTaskStyle(task, i)}
            // @ts-ignore
            onPress={() => navigate('TaskDetailsModal', { taskId: task.id, activeDay })}
          >
            <SmallText textAlign="center">{task.name}</SmallText>
          </TaskEntry>
        ))
      )}
    </Wrapper>
  )
}
