import { Moment } from 'moment';
import { filterTasksByShift } from '~planner/data';
import { Shift, Task } from '~planner/types';

export const createSections = (data: Task[], activeDay: Moment) => [
  {
    title: 'Morning',
    data: data.filter(filterTasksByShift(Shift.MORNING)),
    activeDay,
  },
  {
    title: 'Afternoon',
    data: data.filter(filterTasksByShift(Shift.AFTERNOON)),
    activeDay,
  },
  {
    title: 'Evening',
    data: data.filter(filterTasksByShift(Shift.EVENING)),
    activeDay,
  },
];
