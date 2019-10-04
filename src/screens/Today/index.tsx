import moment, { Moment } from 'moment';
import * as React from 'react';
import {
  AddTaskButton,
  LargeText,
  MediumText,
  ScreenWrapper,
  TaskList,
  WeekBar,
} from '../../components';
import { filterTasksByShift, selectTasksForDay, taskContainer } from '../../data';
import { useContainer } from '../../hooks';
import { Navigation, Shift, Task } from '../../types';
import { getDeltaWeeksFromDate, getWeek, isInPast } from '../../utils';

const createSections = (data: Array<Task>, activeDay: Moment) => [
  {
    title: 'Morning',
    data: data.filter(filterTasksByShift(Shift.MORNING)),
    activeDay,
  },
  {
    title: 'Afternoon',
    data: data.filter(filterTasksByShift(Shift.AFTERNOON)),
    activeDay,
  },
  {
    title: 'Evening',
    data: data.filter(filterTasksByShift(Shift.EVENING)),
    activeDay,
  },
];

export const Today: React.FC<Navigation> = ({ navigation }) => {
  const tasks = useContainer(taskContainer);
  const [currentWeek, setCurrentWeek] = React.useState(getWeek());
  const [activeDay, setActiveDay] = React.useState(moment());

  const handleChangeWeek = (delta: 1 | -1) => {
    const newWeek = getDeltaWeeksFromDate(activeDay, delta);
    setCurrentWeek(newWeek);
    setActiveDay(delta > 0 ? newWeek[0] : newWeek[newWeek.length - 1]);
  };

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
        <LargeText>{activeDay.format('MMMM Do')}</LargeText>
        <TaskList
          sections={createSections(selectTasksForDay(tasks.state.tasks, activeDay), activeDay)}
        />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })} />
    </>
  );
};
