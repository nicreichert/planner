import moment from 'moment'
import * as React from 'react'
import { View } from 'react-native'
import { AddTaskButton, Controller, LargeText, ScreenWrapper, TaskList } from '~planner/components'
import { taskContainer } from '~planner/data'
import { useContainer } from '~planner/hooks'
import { Navigation } from '~planner/types'
import { createSections, getHeaderText } from './helpers'

export const Week: React.FC<Navigation> = ({ navigation }) => {
  const [weekDelta, setWeekDelta] = React.useState(0)
  const tasks = useContainer(taskContainer)

  const handleChangeWeek = (delta: 1 | -1) => setWeekDelta(w => w + delta)

  const activeDay = moment()

  return (
    <>
      <Controller onPressLeft={() => handleChangeWeek(-1)} onPressRight={() => handleChangeWeek(1)}>
        <LargeText>{getHeaderText(weekDelta)}</LargeText>
      </Controller>
      <ScreenWrapper>
        <TaskList
          onOpenTaskDetails={() => null}
          sections={createSections(weekDelta, tasks.state.tasks)}
        />
        <View style={{ height: 60 }} />
      </ScreenWrapper>
      <AddTaskButton activeDay={activeDay} />
    </>
  )
}
