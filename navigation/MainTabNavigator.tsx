import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BrowseScreen from "../screens/BrowseScreen"
import SubCategoryScreen from "../screens/SubCategoryScreen"
import MemosScreen from "../screens/MemosScreen"

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Browse: BrowseScreen,
  SubCategory: SubCategoryScreen,
  Memos: MemosScreen,
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
  Browse: BrowseScreen,
  SubCategory: SubCategoryScreen,
  Memos: MemosScreen,
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
