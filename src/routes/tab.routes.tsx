import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StackRoutes from './stack.routes';

import { Favorites } from '../screens/Favorites';

import theme from '../global/theme';
import { translate } from '../locales';

const { Navigator, Screen } = createBottomTabNavigator();

function TabRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="HomeRoutes"
        screenOptions={{
          headerTintColor: theme.colors.shape,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          tabBarActiveTintColor: theme.colors.primary
        }}
      >
        <Screen
          name="HomeRoutes"
          component={StackRoutes}
          options={{
            title: translate('initialTitle'),
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                size={24}
                name="home"
                color={
                  focused
                  ? theme.colors.primary
                  : "#ccc"
                }
              />
            )
          }}
        />
        <Screen
          name="Favorites"
          component={Favorites}
          options={{
            title: translate('favoritesTitle'),
            tabBarIcon: ({ focused }) => (
              <Icon 
                size={24}
                name="favorite"
                color={
                  focused
                  ? theme.colors.primary
                  : "#ccc"
                }
              />
            )
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default TabRoutes