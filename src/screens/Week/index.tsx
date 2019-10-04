import moment from 'moment';
import * as React from 'react';
import { AddTaskButton, LargeText, ScreenWrapper } from '../../components/atoms';
import { TaskList } from '../../components/particles/TaskList';
import { weekDays } from '../../constants';
import { filterTaskByDay, selectTasksForWeek, taskContainer } from '../../data';
import { useContainer } from '../../hooks';
import { Navigation } from '../../types';
import { getWeek } from '../../utils';

export const ThisWeek: React.FC<Navigation> = ({ navigation }) => {
  const tasks = useContainer(taskContainer);

  const createSections = () => {
    const data = selectTasksForWeek(tasks.state.tasks, moment());
    const week = getWeek();
    return weekDays.map((day, index) => ({
      title: day,
      data: data.filter(filterTaskByDay(week[index])),
      activeDay: week[index],
    }));
  };

  const activeDay = moment();

  return (
    <>
      <ScreenWrapper>
        <LargeText>Your week overview</LargeText>
        <TaskList sections={createSections()} />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })} />
    </>
  );
};
