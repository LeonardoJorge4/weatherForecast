import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Favorites } from '../screens/Favorites';

import theme from '../global/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StackRoutes from './stack.routes';

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
            title: "Início",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icon
                size={24}
                name="home"
                color={focused ? theme.colors.primary : "#ccc"}
              />
            )
          }}
        />
        <Screen
          name="Favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
            tabBarIcon: ({ focused }) => (
              <Icon 
                size={24}
                name="favorite"
                color={focused ? theme.colors.primary : "#ccc"}
              />
            )
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default TabRoutes