import { Moment } from 'moment'
import { DayOfWeek, RecurrencyType, Shift, Task } from '~planner/types'
import { combineFilters, getOccurrencesInWeek, getWeek } from '~planner/utils'

/**
 * Filters
 */
export const filterTasksWithRecurrency = (day: Moment) => (task: Task) => {
  if (task.recurrencyType === 'WEEK_DAYS') {
    return (
      (task.recurrency as DayOfWeek[]).includes(day.format('ddd') as DayOfWeek) &&
      day.diff(task.date, 'day') >= 0
    )
  } else if (task.recurrencyType === 'TIMES_PER_WEEK') {
    return (
      (getOccurrencesInWeek(task.completed, day) < (task.recurrency as number) ||
        Boolean(task.completed.find(c => c.isSame(day, 'day')))) &&
      day.diff(task.date, 'day') >= 0
    )
  } else if (task.recurrencyType === 'MONTHLY') {
    return (
      (task.recurrency as number[]).includes(parseInt(day.format('DD'))) &&
      day.diff(task.date, 'day') >= 0
    )
  }
  return task.date.isSame(day, 'day')
}

export const filterTasksByShift = (shift: Shift) => (task: Task) => task.shift === shift

export const filterRecurrentTasks = (task: Task) => task.recurrencyType !== RecurrencyType.NONE

export const filterTasksForWeek = (day: Moment) => (task: Task) =>
  Boolean(getWeek(day).find(d => d.isSame(task.date, 'day')))

/**
 * Sorts
 */
const sortByCompletion = (day: Moment) => (taskA: Task, taskB: Task) => {
  if (
    taskA.completed.find(c => c.isSame(day, 'day')) &&
    !taskB.completed.find(c => c.isSame(day, 'day'))
  ) {
    return -1
  } else if (
    taskB.completed.find(c => c.isSame(day, 'day')) &&
    !taskA.completed.find(c => c.isSame(day, 'day'))
  ) {
    return 1
  }
  return 0
}

const sortByStartTime = (taskA: Task, taskB: Task) => {
  if (taskA.startTime.diff(taskB.startTime, 'minutes') > 0) {
    return 1
  } else if (taskB.startTime.diff(taskA.startTime, 'minutes') > 0) {
    return -1
  }
  return 0
}

/**
 * Selectors
 */
export const selectTasksForDay = (tasks: Task[], day: Moment) =>
  combineFilters(filterTasksWithRecurrency(day))(tasks)
    .sort(sortByStartTime)
    .sort(sortByCompletion(day))

export const selectTasksForWeek = (tasks: Task[], day: Moment) =>
  combineFilters(filterTasksForWeek(day), filterRecurrentTasks)(tasks)
