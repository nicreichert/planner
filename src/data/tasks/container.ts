import moment, { Moment } from 'moment'
import { Omit, Optional } from 'utility-types'
import uuid from 'uuid'
import { Container } from '~planner/hooks'
import { RawTask, RecurrencyType, Shift, Task, TaskNote } from '~planner/types'
import { noteContainer } from '../notes'
import { database } from '../setup'

const mapTask = (task: RawTask): Task => ({
  ...task,
  date: moment(task.date),
  notes: noteContainer.getNotes(task.notes),
  completed: task.completed.map(c => moment(c)),
})

const unmapTask = (task: Task): RawTask => ({
  ...task,
  date: (task.date as Moment).toISOString(),
  completed: task.completed.map(c => (c as Moment).toISOString()),
  notes: task.notes.map(n => n.id),
})

interface State {
  tasks: Task[]
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
      .then(items => items.map(i => i.get()).map(mapTask))
      .then(tasks => this.setState({ tasks }))

    database.then(db => {
      db.tasks.$.subscribe(() => {
        db.tasks
          .find()
          .exec()
          .then(items => items.map(i => i.get()).map(mapTask))
          .then(tasks => this.setState({ tasks }))
      })
    })
  }

  public getTask = (id: string) => this.state.tasks.find(t => t.id === id)

  public addTask = async (task: Omit<Optional<Task>, 'id'>) =>
    database.then(db =>
      db.tasks.insert(
        unmapTask({
          ...baseTask,
          ...task,
          id: uuid(),
        } as Task)
      )
    )

  public updateTask = async (id: string, task: Omit<Optional<Task>, 'id'>) =>
    database.then(db =>
      db.tasks
        .findOne(id)
        .exec()
        .then(val =>
          val.update({
            $set: unmapTask({
              ...baseTask,
              ...task,
            } as Task),
          })
        )
    )

  public removeTask = async (taskId: string) =>
    database.then(db =>
      db.tasks
        .findOne(taskId)
        .exec()
        .then(val => val && val.remove())
    )

  private completeTask = async (task: Task, completion: Moment) =>
    database.then(db =>
      db.tasks
        .findOne(task.id)
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
        .findOne(task.id)
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

  public addNote = async (taskId: string, text: string, date: Moment) =>
    database.then(async db => {
      const id = await noteContainer.addNote({ text, date })

      return db.tasks
        .findOne(taskId)
        .exec()
        .then(val =>
          val.update({
            $set: {
              notes: [...val.get('notes'), id],
            },
          })
        )
    })
}

export const taskContainer = new TaskContainer()
