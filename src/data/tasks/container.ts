import asyncStorage from '@react-native-community/async-storage';
import moment, { Moment } from 'moment';
import update from 'ramda/es/update';
import { Container } from '~planner/hooks';
import { Task } from '~planner/types';
import { database } from '../setup';

console.log(database);

const DATA_KEY = '__TASKS__';

export const getTasks = async () => {
  const data = await asyncStorage.getItem(DATA_KEY);
  const parsedData = JSON.parse(data || '') as Task[];

  return parsedData.map(task => ({
    ...task,
    date: moment(task.date),
    completed: task.completed.map(c => moment(c)),
  }));
};

export const setTasksData = (data: Task[]) => {
  asyncStorage.setItem(DATA_KEY, JSON.stringify(data));
};

interface State {
  tasks: Task[];
}

export default class TaskContainer extends Container<State> {
  public constructor() {
    super();

    this.state = {
      tasks: [] as Task[],
    };

    getTasks().then(tasks => this.setState({ tasks: tasks || ([] as Task[]) }));
  }

  public addTask = async (task: Task) =>
    this.setState(
      s => ({ tasks: [...s.tasks, task] }),
      s => setTasksData(s.tasks)
    );

  public removeTask = async (taskId: string) =>
    this.setState(
      s => ({ tasks: s.tasks.filter(t => t.id !== taskId) }),
      s => setTasksData(s.tasks)
    );

  private completeTask = async (task: Task, completion: Moment) => {
    task.completed.push(completion);
    return this.updateTask(task);
  };

  private uncompleteTask = async (task: Task, completion: Moment) => {
    task.completed = task.completed.filter(c => !c.isSame(completion, 'day'));
    return this.updateTask(task);
  };

  public toggleComplete = async (task: Task, completion: Moment) => {
    if (task.completed.find(c => c.isSame(completion, 'day'))) {
      this.uncompleteTask(task, completion);
    } else {
      this.completeTask(task, completion);
    }
  };

  public updateTask = async (task: Task) =>
    this.setState(
      s => ({
        tasks: update(
          s.tasks.findIndex(t => t.id === task.id),
          task,
          s.tasks
        ),
      }),
      s => setTasksData(s.tasks)
    );
}

export const taskContainer = new TaskContainer();
