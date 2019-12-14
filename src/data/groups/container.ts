import { Container } from '~planner/hooks'
import { Group } from '~planner/types'
import { loadGroups } from './storage'

interface State {
  groups: Group[];
}

export default class GroupContainer extends Container<State> {
  public constructor() {
    super()

    loadGroups().then(groups => this.setState({ groups }))
  }
}

export const groupContainer = new GroupContainer()
