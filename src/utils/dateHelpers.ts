import moment, { Moment } from 'moment'
import { Shift } from '~planner/types'
import { times } from './times'

export const EU_FORMAT = 'MM/DD/YYYY'
export const HOUR_FORMAT = 'HH:mm:ss'

// @ts-ignore
moment.locale('en', {
  week: {
    dow: 1,
  },
})
moment.locale('en')

export const getWeek = (now: Moment = moment()) => {
  const weekStart = now.clone().startOf('week')
  return times(7, index => moment(weekStart).add(index, 'days'))
}

export const getDeltaWeeksFromDate = (date: Moment, delta: 1 | -1) => {
  return getWeek(date.add(delta, 'weeks'))
}

export const getOccurrencesInWeek = (dates: Moment[], day: Moment) => {
  const week = getWeek(day).map(d => d.format(EU_FORMAT))
  return dates.reduce((acc, d) => (week.includes(d.format(EU_FORMAT)) ? acc + 1 : acc), 0)
}

export const isInPast = (date: Moment) => date.diff(moment(), 'days') < 0

export const formatTime = (hour: number) =>
  `${hour.toString().length === 1 ? `${0}${hour}` : hour}:00`

export const getShiftForTime = (time: Moment) => {
  const hour = time.get('hour')

  if (hour < 12) {
    return Shift.MORNING
  } else if (hour < 19) {
    return Shift.AFTERNOON
  }
  return Shift.EVENING
}
