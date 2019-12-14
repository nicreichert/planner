import * as React from 'react'
import { View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import styled from 'styled-components'
import { colors } from '~planner/constants'
import { CreateTaskModal, TaskDetails } from '~planner/modals'
import { Today, Trends, Week } from '~planner/screens'
import { isIphoneX } from '~planner/utils'
import { Icon, IconType } from './components'
// import './mock-tasks'

console.disableYellowBox = true

const Wrapper = styled(View)`
  padding-top: ${isIphoneX ? 40 : 0}px;
  padding-bottom: ${isIphoneX ? 0 : 40}px;
  height: 100%;
`

const ModalNavigator = createStackNavigator(
  {
    Home: createBottomTabNavigator(
      {
        Today: {
          screen: Today,
          navigationOptions: {
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ tintColor }) => (
              <Icon type={IconType.CALENDAR_DAY} size={20} color={tintColor} />
            ),
          },
        },
        Week: {
          screen: Week,
          navigationOptions: {
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ tintColor }) => (
              <Icon type={IconType.CALENDAR} size={20} color={tintColor} />
            ),
          },
        },
        Trends: {
          screen: Trends,
          navigationOptions: {
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ tintColor }) => (
              <Icon type={IconType.ANALYTICS} size={20} color={tintColor} />
            ),
          },
        },
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
    },
    TaskDetailsModal: {
      screen: TaskDetails,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppNavigator = createAppContainer(ModalNavigator)

const App = () => (
  <Wrapper>
    <AppNavigator />
  </Wrapper>
)

export default App
