import moment, { Moment } from 'moment'
import { Omit, Optional } from 'utility-types'
import uuid from 'uuid'
import { Container } from '~planner/hooks'
import { TaskNote } from '~planner/types'
import { database } from '../setup'

const mapNote = (note: TaskNote) => ({
  ...note,
  date: moment(note.date),
})

const unmapNote = (note: TaskNote) => ({
  ...note,
  date: (note.date as Moment).toISOString(),
})

interface State {
  notes: TaskNote[]
}

export default class NoteContainer extends Container<State> {
  public constructor() {
    super()

    this.state = {
      notes: [] as TaskNote[],
    }

    database
      .then(db => db.notes.find().exec())
      .then(items => items.map(i => i.get()).map(mapNote))
      .then(notes => this.setState({ notes }))

    database.then(db => {
      db.notes.$.subscribe(() => {
        db.notes
          .find()
          .exec()
          .then(items => items.map(i => i.get()).map(mapNote))
          .then(notes => this.setState({ notes }, console.log))
      })
    })
  }

  public getNotes = (ids: string[]) =>
    ids.map(id => this.state.notes.find(n => n.id === id)) as TaskNote[]

  public addNote = async (note: Omit<TaskNote, 'id'>) => {
    const id = uuid()
    await database.then(db =>
      db.notes.insert(
        unmapNote({
          ...note,
          id,
        } as TaskNote)
      )
    )

    return id
  }

  public updateNote = async (id: string, note: Omit<Optional<TaskNote>, 'id'>) =>
    database.then(db =>
      db.notes
        .findOne(id)
        .exec()
        .then(val =>
          val.update({
            $set: unmapNote({
              ...note,
            } as TaskNote),
          })
        )
    )

  public removeNote = async (noteId: string) =>
    database.then(db =>
      db.notes
        .findOne(noteId)
        .exec()
        .then(val => val && val.remove())
    )
}

export const noteContainer = new NoteContainer()
