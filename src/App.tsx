import moment, { Moment } from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styled from 'styled-components';
import uuid from 'uuid';
import { colors } from './constants';
import { taskContainer } from './data';
import { CreateTaskModal } from './modals/CreateTask';
import { ThisWeek, Today } from './screens';
import { RecurrencyType, Shift, TaskNote } from './types';
import { isIphoneX } from './utils';

console.disableYellowBox = true;

// create some tasks to begin with.
setTimeout(() => {
  return; // uncomment to create first few tasks.
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment(),
    name: 'First Task',
    notes: [] as Array<TaskNote>,
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment(),
    name: 'Second morning Task',
    notes: [] as Array<TaskNote>,
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment().add(200, 'seconds'),
    name: 'Second Task',
    notes: [] as Array<TaskNote>,
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.AFTERNOON,
    recurrencyType: RecurrencyType.NONE,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Array<Moment>,
    date: moment().add(400, 'seconds'),
    name: 'Third Task',
    notes: [] as Array<TaskNote>,
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.EVENING,
    recurrencyType: RecurrencyType.WEEK_DAYS,
    recurrency: ['Mon', 'Wed', 'Fri'],
  });
}, 1000);

const AppNavigator = createAppContainer(
  // @ts-ignore
  createStackNavigator(
    {
      Home: createBottomTabNavigator(
        {
          Today: Today,
          ['This Week']: ThisWeek,
        },
        {
          tabBarOptions: {
            activeTintColor: colors.primary,
            inactiveTintColor: colors.primaryText,
          },
          initialRouteName: 'Today',
        }
      ),
      CreateTaskModal: {
        screen: CreateTaskModal,
        navigationOptions: {
          header: () => (
            <View>
              <Text>Create Task</Text>
            </View>
          ),
        },
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  )
);

const Wrapper = styled(View)`
  padding-top: ${isIphoneX ? 40 : 0}px;
  padding-bottom: ${isIphoneX ? 0 : 40}px;
  height: 100%;
`;

export default () => (
  <Wrapper>
    <AppNavigator />
  </Wrapper>
);