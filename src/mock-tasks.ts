import { Moment } from 'moment'
import { taskContainer } from '~planner/data'
import { RecurrencyType, Shift, TaskNote } from '~planner/types'
import { getWeek } from '~planner/utils'

// create some tasks to begin with.
setTimeout(() => {
  const date = getWeek()[0]
  taskContainer.addTask({
    completed: [] as Moment[],
    date: date,
    name: 'First Task',
    notes: [] as TaskNote[],
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  })
  taskContainer.addTask({
    completed: [] as Moment[],
    date: date.add(100, 'seconds'),
    name: 'Second morning Task',
    notes: [] as TaskNote[],
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  })
  taskContainer.addTask({
    completed: [] as Moment[],
    date: date.add(200, 'seconds'),
    name: 'Second Task',
    notes: [] as TaskNote[],
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.AFTERNOON,
    recurrencyType: RecurrencyType.NONE,
    recurrency: 0,
  })
  taskContainer.addTask({
    completed: [] as Moment[],
    date: date.add(400, 'seconds'),
    name: 'Third Task',
    notes: [] as TaskNote[],
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.EVENING,
    recurrencyType: RecurrencyType.WEEK_DAYS,
    recurrency: ['Mon', 'Wed', 'Fri'],
  })
}, 2000)
