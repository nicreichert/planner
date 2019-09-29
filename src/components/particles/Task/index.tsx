import { Moment } from 'moment';
import * as React from 'react';
import { Task as TaskInterface } from '../../../types';
import { Input, InputType } from '../../atoms';
import { TaskName, Wrapper } from './styled';

interface Props {
  task: TaskInterface;
  activeDay: Moment;
  onChange: (disabled: boolean) => void;
}

export const Task = ({ activeDay, onChange, task }: Props) => {
  const completed = Boolean(task.completed.find(c => c.isSame(activeDay, 'day')));

  return (
    <Wrapper>
      <Input type={InputType.CHECKBOX} disabled={!completed} onChange={onChange} m={'0 10px'} />
      <TaskName>{task.name}</TaskName>
    </Wrapper>
  );
};
