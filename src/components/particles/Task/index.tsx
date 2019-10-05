import { Moment } from 'moment';
import * as React from 'react';
import { View } from 'react-native';
import { colors } from '../../../constants';
import { Task as TaskInterface } from '../../../types';
import { BaseText, Icon, IconType, Input, InputType } from '../../atoms';
import { Wrapper } from './styled';

interface Props {
  activeDay: Moment;
  onOpenDetails: (task: TaskInterface) => void;
  onToggleComplete: (disabled: boolean) => void;
  task: TaskInterface;
}

export const Task = ({ activeDay, onOpenDetails, onToggleComplete, task }: Props) => {
  const completed = Boolean(task.completed.find(c => c.isSame(activeDay, 'day')));

  return (
    <Wrapper completed={completed} onPress={() => onOpenDetails(task)}>
      <Input
        type={InputType.CHECKBOX}
        disabled={!completed}
        onChange={onToggleComplete}
        m={'0 10px'}
      />
      <BaseText mr={'auto'}>{task.name}</BaseText>
      <View style={{ marginRight: 10 }}>
        <Icon type={IconType.ARROW} size={20} color={colors.primaryText} />
      </View>
    </Wrapper>
  );
};
