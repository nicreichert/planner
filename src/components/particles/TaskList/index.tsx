import { Moment } from 'moment';
import * as React from 'react';
import { SectionList, View } from 'react-native';
import styled from 'styled-components';
import { MediumText } from '~planner/components';
import { colors } from '~planner/constants';
import { taskContainer } from '~planner/data';
import { useContainer } from '~planner/hooks';
import { Task as TaskInterface } from '~planner/types';
import { Task } from '../Task';

const Header = styled(View)`
  margin-bottom: 10px;
`;

const Separator = styled(View)`
  height: 0.5px;
  background-color: ${colors.primary};
`;

const Footer = styled(View)`
  height: 30px;
`;

interface Props {
  sections: { title: string; data: TaskInterface[]; activeDay: Moment }[];
  onOpenTaskDetails: (task: TaskInterface) => void;
}

export const TaskList = ({ sections, onOpenTaskDetails }: Props) => {
  const tasksContainer = useContainer(taskContainer);

  return (
    <SectionList
      style={{ paddingTop: 10 }}
      sections={sections}
      keyExtractor={task => task.id}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Footer}
      renderSectionHeader={({ section: { title, data } }) =>
        data.length > 0 ? (
          <Header>
            <MediumText>{title}</MediumText>
          </Header>
        ) : null
      }
      renderItem={({ item, section: { activeDay } }) => (
        <Task
          onOpenDetails={onOpenTaskDetails}
          onToggleComplete={() => tasksContainer.toggleComplete(item, activeDay)}
          activeDay={activeDay}
          task={item}
        />
      )}
    />
  );
};
