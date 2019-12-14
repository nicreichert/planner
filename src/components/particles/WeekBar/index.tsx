import { Moment } from 'moment'
import * as React from 'react'
import { ButtonLabel, DayButton } from '~planner/components'
import { EU_FORMAT } from '~planner/utils'
import { Controller } from '../Controller'
import { Bar } from './styled'

interface Props {
  activeDay: Moment;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSetActiveDay: (day: Moment) => void;
  week: Moment[];
}

export const WeekBar: React.FC<Props> = ({
  activeDay,
  onSwipeLeft,
  onSwipeRight,
  onSetActiveDay,
  week,
}) => {
  return (
    <Controller onPressLeft={onSwipeRight} onPressRight={onSwipeLeft}>
      <Bar onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        {week.map(day => {
          const inactive = day.format(EU_FORMAT) !== activeDay.format(EU_FORMAT)
          return (
            <DayButton
              key={day.format(EU_FORMAT)}
              onPress={() => onSetActiveDay(day)}
              alt={!inactive}
            >
              <ButtonLabel alt={!inactive}>{`${day.format('ddd')}\n${day.format(
                'D'
              )}`}</ButtonLabel>
            </DayButton>
          )
        })}
      </Bar>
    </Controller>
  )
}
