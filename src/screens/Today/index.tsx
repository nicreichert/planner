import moment from 'moment'
import * as React from 'react'
import { View } from 'react-native'
import {
  AddTaskButton,
  ButtonIcon,
  IconType,
  LargeText,
  MediumText,
  Row,
  ScreenWrapper,
  WeekBar,
} from '~planner/components'
import { colors } from '~planner/constants'
import { taskContainer } from '~planner/data'
import { useContainer } from '~planner/hooks'
import { Navigation } from '~planner/types'
import { getDeltaWeeksFromDate, getWeek, isInPast } from '~planner/utils'
import { Calendar, List } from './views'

type ViewType = 'LIST' | 'CALENDAR'

const TABS = [
  { type: 'LIST' as ViewType, icon: IconType.TICK, isActive: (type: ViewType) => type === 'LIST' },
  {
    type: 'CALENDAR' as ViewType,
    icon: IconType.LIST,
    isActive: (type: ViewType) => type === 'CALENDAR',
  },
]

export const Today: React.FC<Navigation> = () => {
  const tasks = useContainer(taskContainer)
  const [currentView, setCurrentView] = React.useState<ViewType>('LIST')
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
        <Row justifyContent="space-between" alignItems="center">
          <View>
            <MediumText>{isInPast(activeDay) ? 'What I did on' : 'My plans for'}</MediumText>
            <LargeText mb={20} bold>
              {activeDay.format('MMMM Do')}
            </LargeText>
          </View>
          <Row>
            {TABS.map(tab => (
              <ButtonIcon
                key={tab.type}
                onPress={() => setCurrentView(tab.type)}
                type={tab.icon}
                size={20}
                color={tab.isActive(currentView) ? colors.primary : colors.primaryText}
                mr={20}
              />
            ))}
          </Row>
        </Row>
        {currentView === 'LIST' ? (
          <List activeDay={activeDay} tasks={tasks.state.tasks} />
        ) : (
          <Calendar activeDay={activeDay} tasks={tasks.state.tasks} />
        )}
        <View style={{ height: 60 }} />
      </ScreenWrapper>
      <AddTaskButton activeDay={activeDay} />
    </>
  )
}
