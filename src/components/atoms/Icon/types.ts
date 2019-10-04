export interface BaseProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export enum IconType {
  ARROW = 'Arrow',
  CALENDAR = 'Calendar',
  CIRCLE = 'Circle',
  CLOSE = 'Close',
  EDIT = 'Edit',
  MINUS = 'Minus',
  PLUS = 'Plus',
  SUCCESS = 'Success',
  TRASH = 'Trash',
}
