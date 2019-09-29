import React from 'react';
import { Dimensions, Platform, ScaledSize, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styled from 'styled-components';
import { Button, ScreenWrapper } from './components';
import { colors } from './constants/theme';
import { CreateTaskModal } from './modals/CreateTask';
import { Today } from './screens';
import { Navigation } from './types';

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim: ScaledSize) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim: ScaledSize) {
  return dim.height === 896 || dim.width === 896;
}

const Wrapper = styled(View)`
  padding-top: ${isIphoneX ? 40 : 0}px;
  height: 100%;
`;

interface Props extends Navigation {}

const App2: React.FC<Props> = props => {
  return (
    <ScreenWrapper>
      <Wrapper>
        <Button onPress={() => props.navigation.navigate('Home')} label={'Home'} />
      </Wrapper>
    </ScreenWrapper>
  );
};

const AppNavigator = createAppContainer(
  // @ts-ignore
  createStackNavigator(
    {
      Home: createBottomTabNavigator(
        {
          Today: Today,
          Week: App2,
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

export default () => (
  <Wrapper>
    <AppNavigator />
  </Wrapper>
);
