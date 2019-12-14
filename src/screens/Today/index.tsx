import moment from 'moment'
import * as React from 'react'
import {
  AddTaskButton,
  LargeText,
  MediumText,
  ScreenWrapper,
  TaskList,
  WeekBar,
} from '~planner/components'
import { selectTasksForDay, taskContainer } from '~planner/data'
import { useContainer } from '~planner/hooks'
import { Navigation, Task } from '~planner/types'
import { getDeltaWeeksFromDate, getWeek, isInPast } from '~planner/utils'
import { createSections } from './helpers'

export const Today: React.FC<Navigation> = ({ navigation }) => {
  const tasks = useContainer(taskContainer)
  const [currentWeek, setCurrentWeek] = React.useState(getWeek())
  const [activeDay, setActiveDay] = React.useState(moment())

  const handleChangeWeek = (delta: 1 | -1) => {
    const newWeek = getDeltaWeeksFromDate(activeDay, delta)
    setCurrentWeek(newWeek)
    setActiveDay(delta > 0 ? newWeek[0] : newWeek[newWeek.length - 1])
  }

  return (
    <>
      <WeekBar
        week={currentWeek}
        activeDay={activeDay}
        onSetActiveDay={setActiveDay}
        onSwipeLeft={() => handleChangeWeek(1)}
        onSwipeRight={() => handleChangeWeek(-1)}
      />
      <ScreenWrapper>
        <MediumText>{isInPast(activeDay) ? 'What you did on' : 'Your plans for'}</MediumText>
        <LargeText mb={20}>{activeDay.format('MMMM Do')}</LargeText>
        <TaskList
          onOpenTaskDetails={(task: Task) => navigation.navigate('TaskDetailsModal', { task })}
          sections={createSections(selectTasksForDay(tasks.state.tasks, activeDay), activeDay)}
        />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })} />
    </>
  )
}
