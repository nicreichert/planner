import { Moment } from 'moment';
import * as React from 'react';
import { Task as TaskInterface } from '../../../types';
import { BaseText, Input, InputType } from '../../atoms';
import { Wrapper } from './styled';

interface Props {
  activeDay: Moment;
  onChange: (disabled: boolean) => void;
  task: TaskInterface;
}

export const Task = ({ activeDay, onChange, task }: Props) => {
  const completed = Boolean(task.completed.find(c => c.isSame(activeDay, 'day')));

  return (
    <Wrapper completed={completed}>
      <Input type={InputType.CHECKBOX} disabled={!completed} onChange={onChange} m={'0 10px'} />
      <BaseText>{task.name}</BaseText>
    </Wrapper>
  );
};
