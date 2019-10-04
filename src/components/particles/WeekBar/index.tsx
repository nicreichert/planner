import { Moment } from 'moment';
import * as React from 'react';
import { ButtonLabel } from '../..';
import { EU_FORMAT } from '../../../utils';
import { DayButton } from '../../atoms';
import { Bar } from './styled';

interface Props {
  activeDay: Moment;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSetActiveDay: (day: Moment) => void;
  week: Array<Moment>;
}

export const WeekBar: React.FC<Props> = ({
  activeDay,
  onSwipeLeft,
  onSwipeRight,
  onSetActiveDay,
  week,
}) => {
  return (
    <Bar onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
      {week.map(day => {
        const inactive = day.format(EU_FORMAT) !== activeDay.format(EU_FORMAT);
        return (
          <DayButton
            key={day.format(EU_FORMAT)}
            onPress={() => onSetActiveDay(day)}
            alt={!inactive}
          >
            <ButtonLabel alt={!inactive}>{`${day.format('ddd')}\n${day.format('D')}`}</ButtonLabel>
          </DayButton>
        );
      })}
    </Bar>
  );
};
