import { Moment } from 'moment';
import * as React from 'react';
import { SectionList, View } from 'react-native';
import { filterTasksByShift, selectTasksForDay, taskContainer } from '../../../data/tasks';
import { useContainer } from '../../../hooks';
import { Shift } from '../../../types';
import { BaseText } from '../../atoms';
import { Task } from '../Task';
import { Header } from './styled';

interface Props {
  activeDay: Moment;
}

export const TaskList = ({ activeDay }: Props) => {
  const tasksContainer = useContainer(taskContainer);
  const data = selectTasksForDay(tasksContainer.state.tasks, activeDay);

  const createSections = () => [
    {
      title: 'Morning',
      data: data.filter(filterTasksByShift(Shift.MORNING)),
    },
    {
      title: 'Afternoon',
      data: data.filter(filterTasksByShift(Shift.AFTERNOON)),
    },
    {
      title: 'Evening',
      data: data.filter(filterTasksByShift(Shift.EVENING)),
    },
  ];

  return (
    <SectionList
      style={{ paddingTop: 10 }}
      sections={createSections()}
      keyExtractor={task => task.id}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length > 0 ? (
          <Header>
            <BaseText>{title}</BaseText>
          </Header>
        ) : null
      }
      renderItem={({ item }) => (
        <Task
          onChange={() => tasksContainer.toggleComplete(item, activeDay)}
          activeDay={activeDay}
          task={item}
        />
      )}
    />
  );
};
