import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

import { useCity } from '../../contexts/CitiesContext';
import theme from '../../global/theme';

import { styles } from './styles';

export function CardAddCity() {
  const {
    loadingAddCity,
    cityFinded,
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
            Brasil
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddCity}
          disabled={loadingAddCity}
        >
          <Text style={styles.textButton}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
  )
}