import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { City } from '../screens/City';
import { Home } from '../screens/Home';

import { SwitchTemperature } from '../components/SwitchTemperature';

import { translate } from '../locales';

import theme from '../global/theme';

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
          title: translate('initialTitle'),
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