import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, IconType, ModalWrapper, Row, ScreenWrapper } from '~planner/components';
import { colors } from '~planner/constants';
import { taskContainer } from '~planner/data';
import { useContainer, useToggle } from '~planner/hooks';
import { Navigation, Task } from '~planner/types';

export const TaskDetails: React.FC<Navigation> = ({ navigation }) => {
  const [isEditing, toggleEdit] = useToggle(false);
  const tasks = useContainer(taskContainer);
  const task = navigation.getParam('task') as Task;

  return (
    <ModalWrapper title={task.name}>
      <ScreenWrapper>
        <Row mt={20} alignItems="center">
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
    </ModalWrapper>
  );
};