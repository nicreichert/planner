import moment, { Moment } from 'moment';
import { times } from './times';

export const EU_FORMAT = 'MM/dd/yyyy';

export const getWeek = (now: Moment = moment()) => {
  const weekStart = now.clone().startOf('week');
  return times(7, index => moment(weekStart).add(index, 'days'));
};

export const getDeltaWeeksFromDate = (date: Moment, delta: 1 | -1) => {
  return getWeek(date.add(delta, 'weeks'));
};

export const getOccurrencesInWeek = (dates: Array<Moment>, day: Moment) => {
  const week = getWeek(day).map(d => d.format(EU_FORMAT));
  return dates.reduce((acc, d) => (week.includes(d.format(EU_FORMAT)) ? acc + 1 : acc), 0);
};

export const isInPast = (date: Moment) => date.diff(moment(), 'days') < 0;
