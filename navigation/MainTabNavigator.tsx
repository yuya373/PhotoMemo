import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import { HomeScreenContainer } from '../container/HomeScreenContainer';
import { MemosScreenContainer } from '../container/MemosScreenContainer';
import { BrowseScreenContainer } from '../container/BrowseScreenContainer';
import { SubCategoryScreenContainer } from '../container/SubCategoryScreenContainer';

const HomeStack = createStackNavigator({
  Home: HomeScreenContainer,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const BrowseStack = createStackNavigator({
  Browse: BrowseScreenContainer,
  SubCategory: SubCategoryScreenContainer,
  Memos: MemosScreenContainer,
})

BrowseStack.navigationOptions = {
  tabBarLabel: "Browse",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="browsers"
    />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  BrowseStack,
  SettingsStack,
});
