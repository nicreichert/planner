import { Icon, IconType, LargeText, Row, ScreenWrapper } from '@planner/components';
import { colors } from '@planner/constants';
import { taskContainer } from '@planner/data';
import { useContainer, useToggle } from '@planner/hooks';
import { Navigation, Task } from '@planner/types';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

export const TaskDetails: React.FC<Navigation> = ({ navigation }) => {
  const [isEditing, toggleEdit] = useToggle(false);
  const tasks = useContainer(taskContainer);
  const task = navigation.getParam('task') as Task;

  return (
    <ScreenWrapper>
      <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.goBack()}>
        <Icon type={IconType.CLOSE} size={30} color={colors.primary} />
      </TouchableOpacity>
      <Row mt={20} alignItems="center">
        <LargeText>{task.name}</LargeText>
        <TouchableOpacity
          style={{ marginLeft: 'auto', marginRight: 10 }}
          onPress={() => {
            tasks.removeTask(task.id);
            navigation.goBack();
          }}
        >
          <Icon type={IconType.TRASH} size={25} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleEdit}>
          <Icon type={IconType.EDIT} size={25} color={colors.primary} />
        </TouchableOpacity>
      </Row>
    </ScreenWrapper>
  );
};
