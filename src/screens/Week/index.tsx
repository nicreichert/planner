import moment from 'moment';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  AddTaskButton,
  Icon,
  IconType,
  LargeText,
  ScreenWrapper,
  TaskList,
} from '../../components';
import { colors, weekDays } from '../../constants';
import { filterTasksWithRecurrency, selectTasksForWeek, taskContainer } from '../../data';
import { useContainer } from '../../hooks';
import { Navigation } from '../../types';
import { getWeek } from '../../utils';

export const Week: React.FC<Navigation> = ({ navigation }) => {
  const [weekDelta, setWeekDelta] = React.useState(0);
  const tasks = useContainer(taskContainer);

  const handleChangeWeek = (delta: 1 | -1) => setWeekDelta(w => w + delta);

  const createSections = () => {
    const date = moment().add(weekDelta, 'weeks');
    const data = selectTasksForWeek(tasks.state.tasks, date);
    const week = getWeek(date);
    return weekDays.map((day, index) => ({
      title: day,
      data: data.filter(filterTasksWithRecurrency(week[index])),
      activeDay: week[index],
    }));
  };

  const getHeaderText = () => {
    if (weekDelta === 0) {
      return 'This week\'s overview';
    } else if (weekDelta === -1) {
      return 'Last week\'s overview';
    } else if (weekDelta === 1) {
      return 'Next week\'s overview';
    } else if (weekDelta > 0) {
      return `Plans for ${weekDelta} weeks from now`;
    } else {
      return `Overview of ${Math.abs(weekDelta)} weeks ago`;
    }
  };

  const activeDay = moment();

  return (
    <>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}
      >
        <TouchableOpacity onPress={() => handleChangeWeek(-1)}>
          <View style={{ transform: [{ rotateZ: '180deg' }] }}>
            <Icon type={IconType.ARROW} size={30} color={colors.primary} />
          </View>
        </TouchableOpacity>
        <LargeText>{getHeaderText()}</LargeText>
        <TouchableOpacity onPress={() => handleChangeWeek(1)}>
          <Icon type={IconType.ARROW} size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScreenWrapper>
        <TaskList sections={createSections()} />
      </ScreenWrapper>
      <AddTaskButton onPress={() => navigation.navigate('CreateTaskModal', { activeDay })} />
    </>
  );
};
