import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useCity } from '../../contexts/CitiesContext';

import { translate } from '../../locales';

import { styles } from './styles';
import theme from '../../global/theme';

export function CardAddCity() {
  const {
    loadingAddCity,
    cityFinded,
    cityCountry,
    handleAddCity
  } = useCity();

  return (
    loadingAddCity
    ? <ActivityIndicator
        size="large"
        style={styles.loading}
        color={theme.colors.gray}
      />
    : <View style={styles.container}>
        <View>
          <Text style={styles.city}>
            {cityFinded}
          </Text>
          <Text style={styles.country}>
            {cityCountry}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddCity}
          disabled={loadingAddCity}
        >
          <Text style={styles.textButton}>
            {translate('addText')}
          </Text>
        </TouchableOpacity>
      </View>
  )
}