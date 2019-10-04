import { Moment } from 'moment';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export enum Shift {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  ANY_TIME = 'ANY_TIME',
}

export enum RecurrencyType {
  WEEK_DAYS = 'WEEK_DAYS',
  TIMES_PER_WEEK = 'TIMES_PER_WEEK',
  NONE = 'NONE',
}

export type DayOfWeek = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface Group {
  description: string;
  id: string;
  name: string;
}

export interface TaskNote {
  text: string;
  date: Moment;
}

export interface Task {
  completed: Array<Moment>;
  date: Moment;
  description?: string;
  groupId?: Array<string>;
  id: string;
  name: string;
  notes: Array<TaskNote>;
  recurrencyType: RecurrencyType;
  recurrency?: Array<DayOfWeek> | number;
  repetitions: number;
  completedRepetitions: number;
  shift: Shift;
}

export interface AppData {
  groups: Array<Group>;
  tasks: Array<Task>;
}

export interface Navigation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
