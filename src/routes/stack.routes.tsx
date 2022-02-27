import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { City } from '../screens/City';
import { Cities } from '../screens/Cities';

import theme from '../global/theme';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Cities"
        screenOptions={{
          headerTintColor: theme.colors.shape,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
        }}
      >
        <Screen
          name="Cities"
          component={Cities}
          options={{
            title: "Cidades",
          }}
        />
        <Screen
          name="City"
          component={City}
          options={({ route }: any) => ({ 
            title: route.params.name,
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
}

export default StackRoutes;