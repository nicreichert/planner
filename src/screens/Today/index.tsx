import moment, { Moment } from 'moment';
import * as React from 'react';
import uuid from 'uuid';
import { Icon, IconType, LargeText, MediumText, ScreenWrapper } from '../../components/atoms';
import { TaskList } from '../../components/particles/TaskList';
import { WeekBar } from '../../components/particles/WeekBar';
import { colors } from '../../constants/theme';
import { taskContainer } from '../../data/tasks';
import { Navigation, RecurrencyType, Shift } from '../../types';
import { getDeltaWeeksFromDate, getWeek, isInPast } from '../../utils';
import { AddTaskButton } from './styled';

setTimeout(() => {
  return;
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment(),
    name: 'First Task',
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment(),
    name: 'Second morning Task',
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment().add(200, 'seconds'),
    name: 'Second Task',
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.AFTERNOON,
    recurrencyType: RecurrencyType.NONE,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment().add(400, 'seconds'),
    name: 'Third Task',
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.EVENING,
    recurrencyType: RecurrencyType.WEEK_DAYS,
    recurrency: ['Mon', 'Wed', 'Fri'],
  });
}, 1000);

export const Today: React.FC<Navigation> = ({ navigation }) => {
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
        <TaskList activeDay={activeDay} />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })}>
        <Icon type={IconType.PLUS} color={colors.primary} />
      </AddTaskButton>
    </>
  );
};
