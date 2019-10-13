import moment from 'moment';
import { weekDays } from '~planner/constants';
import { filterTasksWithRecurrency, selectTasksForWeek } from '~planner/data';
import { Task } from '~planner/types';
import { getWeek } from '~planner/utils';

export const createSections = (weekDelta: number, tasks: Task[]) => {
  const date = moment().add(weekDelta, 'weeks');
  const data = selectTasksForWeek(tasks, date);
  const week = getWeek(date);
  return weekDays.map((day, index) => ({
    title: day,
    data: data.filter(filterTasksWithRecurrency(week[index])),
    activeDay: week[index],
  }));
};

export const getHeaderText = (weekDelta: number) => {
  if (weekDelta === 0) {
    return 'This week\'s overview';
  } else if (weekDelta === -1) {
    return 'Last week\'s overview';
  } else if (weekDelta === 1) {
    return 'Next week\'s overview';
  } else if (weekDelta > 0) {
    return `Plans for ${weekDelta} weeks from now`;
  } else {
    return `Overview of ${Math.abs(weekDelta)} weeks ago`;
  }
};
