import React from 'react';
import { Switch, Text, View } from 'react-native';

import { useCity } from '../../contexts/CitiesContext';

import { styles } from './styles';
import theme from '../../global/theme';

export function SwitchTemperature() {
  const { isCelcius, setIsCelcius } = useCity();

  const toggleSwitch = () => setIsCelcius(!isCelcius);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isCelcius ? '°C' : '°F'}
      </Text>
      <Switch
        value={isCelcius}
        onValueChange={toggleSwitch}
        ios_backgroundColor="#3e3e3e"
        thumbColor={theme.colors.secondary}
        trackColor={{
          false: theme.colors.shape,
          true: theme.colors.shape
        }}
      />
    </View>
  )
}