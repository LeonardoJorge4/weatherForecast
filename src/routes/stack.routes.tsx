import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { City } from '../screens/City';

import theme from '../global/theme';
import { Home } from '../screens/Home';
import { Switch, Text, View } from 'react-native';
import { SwitchTemperature } from '../components/SwitchTemperature';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerTintColor: theme.colors.shape,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          title: "Início",
          headerRight: () => (
            <SwitchTemperature />
          )
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
  );
}

export default StackRoutes;