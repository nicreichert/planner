import { Moment } from 'moment';
import * as React from 'react';
import { SectionList, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../constants';
import { taskContainer } from '../../../data/tasks';
import { useContainer } from '../../../hooks';
import { Task as TaskInterface } from '../../../types';
import { MediumText } from '../../atoms';
import { Task } from '../Task';

const Header = styled(View)`
  margin: 20px 0 10px;
`;

const Separator = styled(View)`
  height: 0.5px;
  background-color: ${colors.primary};
`;

interface Props {
  sections: Array<{ title: string; data: Array<TaskInterface>; activeDay: Moment }>;
}

export const TaskList = ({ sections }: Props) => {
  const tasksContainer = useContainer(taskContainer);

  return (
    <SectionList
      style={{ paddingTop: 10 }}
      sections={sections}
      keyExtractor={task => task.id}
      ItemSeparatorComponent={Separator}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length > 0 ? (
          <Header>
            <MediumText>{title}</MediumText>
          </Header>
        ) : null
      }
      renderItem={({ item, section: { activeDay } }) => (
        <Task
          onChange={() => tasksContainer.toggleComplete(item, activeDay)}
          activeDay={activeDay}
          task={item}
        />
      )}
    />
  );
};
