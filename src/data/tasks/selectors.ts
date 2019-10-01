import { Moment } from 'moment';
import { DayOfWeek, Shift, Task } from '../../types';
import { combineFilters, getOccurrencesInWeek } from '../../utils';

/**
 * Filters
 */

const filterTasksWithRecurrency = (day: Moment) => (task: Task) => {
  if (task.recurrencyType === 'WEEK_DAYS') {
    return (
      (task.recurrency as Array<DayOfWeek>).includes(day.format('ddd') as DayOfWeek) &&
      day.diff(task.date, 'day') >= 0
    );
  } else if (task.recurrencyType === 'TIMES_PER_WEEK') {
    return (
      (getOccurrencesInWeek(task.completed, day) < (task.recurrency as number) ||
        Boolean(task.completed.find(c => c.isSame(day, 'day')))) &&
      day.diff(task.date, 'day') >= 0
    );
  }
  return task.date.isSame(day, 'day');
};

export const filterTasksByShift = (shift: Shift) => (task: Task) => task.shift === shift;

/**
 * Sorts
 */
const sortByCompletion = (day: Moment) => (taskA: Task, taskB: Task) => {
  if (taskA.completed.find(c => c.isSame(day, 'day'))) {
    return taskB.date.diff(taskA.date, 'second') < 0 &&
      taskB.completed.find(c => c.isSame(day, 'day'))
      ? 0
      : -1;
  }
  return 1;
};

/**
 * Selectors
 */

/**
 *
 * Select tasks for a given day
 * @param tasks
 * @param day
 */
export const selectTasksForDay = (tasks: Array<Task>, day: Moment) =>
  combineFilters(filterTasksWithRecurrency(day))(tasks).sort(sortByCompletion(day));
