import moment, { Moment } from 'moment'
import { Omit, Optional } from 'utility-types'
import uuid from 'uuid'
import { Container } from '~planner/hooks'
import { RecurrencyType, Shift, Task, TaskNote } from '~planner/types'
import { database } from '../setup'

const mapTasks = (tasks: Task[]) =>
  tasks.map(task => ({
    ...task,
    date: moment(task.date),
    completed: task.completed.map(c => moment(c)),
  }))

interface State {
  tasks: Task[];
}

const baseTask: Omit<Task, 'id' | 'name' | 'date'> = {
  completed: [] as Moment[],
  notes: [] as TaskNote[],
  repetitions: 0,
  completedRepetitions: 0,
  shift: Shift.MORNING,
  recurrencyType: RecurrencyType.NONE,
  recurrency: 0,
}

export default class TaskContainer extends Container<State> {
  public constructor() {
    super()

    this.state = {
      tasks: [] as Task[],
    }

    database
      .then(db => db.tasks.find().exec())
      .then(items => items.map(i => i.get()))
      .then(mapTasks)
      .then(tasks => this.setState({ tasks }, console.log))

    database.then(db => {
      db.tasks.$.subscribe(() => {
        db.tasks
          .find()
          .exec()
          .then(items => items.map(i => i.get()))
          .then(mapTasks)
          .then(tasks => this.setState({ tasks }, console.log))
      })
    })
  }

  public addTask = async (task: Omit<Optional<Task>, 'id'>) =>
    database.then(db =>
      db.tasks.insert({
        id: uuid(),
        ...baseTask,
        ...task,
        date: (task.date as Moment).toISOString(),
      })
    )

  public removeTask = async (taskId: string) =>
    database.then(db =>
      db.tasks
        .findOne()
        .where('id')
        .eq(taskId)
        .exec()
        .then(val => val && val.remove())
    )

  private completeTask = async (task: Task, completion: Moment) =>
    database.then(db =>
      db.tasks
        .findOne()
        .where('id')
        .eq(task.id)
        .exec()
        .then(val =>
          val.update({
            $set: {
              completed: [...val.get('completed'), completion.toISOString()],
            },
          })
        )
    )

  private uncompleteTask = async (task: Task, completion: Moment) =>
    database.then(db =>
      db.tasks
        .findOne()
        .where('id')
        .eq(task.id)
        .exec()
        .then(val =>
          val.update({
            $set: {
              completed: val.get('completed').filter((c: string) => c !== completion.toISOString()),
            },
          })
        )
    )

  public toggleComplete = async (task: Task, completion: Moment) => {
    const completionTime = task.completed.find(c => c.isSame(completion, 'day'))
    if (completionTime) {
      this.uncompleteTask(task, completionTime)
    } else {
      this.completeTask(task, completion)
    }
  }
}

export const taskContainer = new TaskContainer()
