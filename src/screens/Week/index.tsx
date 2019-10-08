import { AddTaskButton, Controller, LargeText, ScreenWrapper, TaskList } from '@planner/components';
import { taskContainer } from '@planner/data';
import { useContainer } from '@planner/hooks';
import { Navigation, Task } from '@planner/types';
import moment from 'moment';
import * as React from 'react';
import { createSections, getHeaderText } from './helpers';

export const Week: React.FC<Navigation> = ({ navigation }) => {
  const [weekDelta, setWeekDelta] = React.useState(0);
  const tasks = useContainer(taskContainer);

  const handleChangeWeek = (delta: 1 | -1) => setWeekDelta(w => w + delta);

  const activeDay = moment();

  return (
    <>
      <Controller onPressLeft={() => handleChangeWeek(-1)} onPressRight={() => handleChangeWeek(1)}>
        <LargeText>{getHeaderText(weekDelta)}</LargeText>
      </Controller>
      <ScreenWrapper>
        <TaskList
          onOpenTaskDetails={(task: Task) => navigation.navigate('TaskDetailsModal', { task })}
          sections={createSections(weekDelta, tasks.state.tasks)}
        />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })} />
    </>
  );
};
