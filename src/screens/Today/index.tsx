import moment, { Moment } from 'moment';
import * as React from 'react';
import uuid from 'uuid';
import { Button } from '../../components';
import { ScreenWrapper } from '../../components/atoms/Screen';
import { TaskList } from '../../components/particles/TaskList';
import { WeekBar } from '../../components/particles/WeekBar';
import { taskContainer } from '../../data/tasks';
import { Navigation, Shift } from '../../types';
import { getDeltaWeeksFromDate, getWeek, isInPast } from '../../utils';
import { DayText, YourPlansText } from './styled';

setTimeout(() => {
  return;
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment(),
    name: 'Do stuff',
    repetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: 'Daily',
    recurrency: 3,
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
        <YourPlansText>{isInPast(activeDay) ? 'What you did on' : 'Your plans for'}</YourPlansText>
        <DayText>{activeDay.format('MMMM Do')}</DayText>
        <TaskList activeDay={activeDay} />
        <Button
          mt={20}
          onPress={() => navigation.navigate('CreateTaskModal')}
          label="Create Task"
        />
      </ScreenWrapper>
    </>
  );
};
