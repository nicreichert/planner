import { Moment } from 'moment';
import * as React from 'react';
import { FlatList } from 'react-native';
import { taskContainer } from '../../../data/tasks';
import { useContainer } from '../../../hooks';
import { Task } from '../Task';

interface Props {
  activeDay: Moment;
}

export const TaskList = ({ activeDay }: Props) => {
  const tasksContainer = useContainer(taskContainer);

  console.log(tasksContainer.state.tasks);

  return (
    <FlatList
      style={{ paddingTop: 10 }}
      data={tasksContainer.state.tasks}
      keyExtractor={task => task.id}
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
