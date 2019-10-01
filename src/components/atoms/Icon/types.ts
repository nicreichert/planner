export interface BaseProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export enum IconType {
  CALENDAR = 'Calendar',
  CIRCLE = 'Circle',
  CLOSE = 'Close',
  EDIT = 'Edit',
  PLUS = 'Plus',
  SUCCESS = 'Success',
  TRASH = 'Trash',
}
