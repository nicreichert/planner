import { DayOfWeek, RecurrencyType, Shift, Task } from '@planner/types';
import { combineFilters, getOccurrencesInWeek, getWeek } from '@planner/utils';
import { Moment } from 'moment';

/**
 * Filters
 */
export const filterTasksWithRecurrency = (day: Moment) => (task: Task) => {
  if (task.recurrencyType === 'WEEK_DAYS') {
    return (
      (task.recurrency as DayOfWeek[]).includes(day.format('ddd') as DayOfWeek) &&
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

export const filterRecurrentTasks = (task: Task) => task.recurrencyType !== RecurrencyType.NONE;

export const filterTasksForWeek = (day: Moment) => (task: Task) =>
  Boolean(getWeek(day).find(d => d.isSame(task.date, 'day')));

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
export const selectTasksForDay = (tasks: Task[], day: Moment) =>
  combineFilters(filterTasksWithRecurrency(day))(tasks).sort(sortByCompletion(day));

export const selectTasksForWeek = (tasks: Task[], day: Moment) =>
  combineFilters(filterTasksForWeek(day), filterRecurrentTasks)(tasks);
