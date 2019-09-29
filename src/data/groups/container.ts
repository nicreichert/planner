import { Container } from '../../hooks';
import { Group } from '../../types';
import { loadGroups } from './storage';

interface State {
  groups: Array<Group>;
}

export default class GroupContainer extends Container<State> {
  constructor() {
    super();

    loadGroups().then(groups => this.setState({ groups }));
  }
}

export const groupContainer = new GroupContainer();
