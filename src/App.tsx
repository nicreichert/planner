import { colors } from '@planner/constants';
import { taskContainer } from '@planner/data';
import { CreateTaskModal, TaskDetails } from '@planner/modals';
import { Today, Week } from '@planner/screens';
import { RecurrencyType, Shift, TaskNote } from '@planner/types';
import { getWeek, isIphoneX } from '@planner/utils';
import { Moment } from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styled from 'styled-components';
import uuid from 'uuid';

console.disableYellowBox = true;

// create some tasks to begin with.
setTimeout(() => {
  return; // uncomment to create first few tasks.

  const date = getWeek()[0];
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Moment[],
    date: date,
    name: 'First Task',
    notes: [] as TaskNote[],
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Moment[],
    date: date.add(100, 'seconds'),
    name: 'Second morning Task',
    notes: [] as TaskNote[],
    repetitions: 0,
    completedRepetitions: 0,
    shift: Shift.MORNING,
    recurrencyType: RecurrencyType.TIMES_PER_WEEK,
    recurrency: 3,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Moment[],
    date: date.add(200, 'seconds'),
    name: 'Second Task',
    notes: [] as TaskNote[],
    repetitions: 3,
    completedRepetitions: 0,
    shift: Shift.AFTERNOON,
    recurrencyType: RecurrencyType.NONE,
  });
  taskContainer.addTask({
    id: uuid(),
    completed: [] as Moment[],
    date: date.add(400, 'seconds'),
    name: 'Third Task',
    notes: [] as TaskNote[],
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
          Today,
          Week,
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
          // eslint-disable-next-line
          header: () => (
            <View>
              <Text>Create Task</Text>
            </View>
          ),
        },
      },
      TaskDetailsModal: {
        screen: TaskDetails,
        // navigationOptions: {
        //   header: () => (
        //     <View>
        //       <Text>Create Task</Text>
        //     </View>
        //   ),
        // },
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
  height: 100%;
`;

const App = () => (
  <Wrapper>
    <AppNavigator />
  </Wrapper>
);

export default App;
