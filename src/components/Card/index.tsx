import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { CitiesAddedProps, useCity } from '../../contexts/CitiesContext';

import { styles } from './styles';

interface CardProps {
  data: CitiesAddedProps;
  hasFavorite: boolean;
}

export function Card({ data, hasFavorite }: CardProps) {
  const { handleFavoriteCity } = useCity();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.city}>
          {data.city}
        </Text>
        <Text style={styles.country}>
          {data.subtitle}
        </Text>
        <Text style={styles.climate}>
          {data.description}
        </Text>
        <Text style={styles.minMaxDegrees}>
          {data.temp_min}° - {data.temp_max}°
        </Text>
      </View>

      <View style={styles.contentRight}>
        <Text style={styles.degrees}>
          {data.temperature}°
        </Text>
        {
          hasFavorite &&
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleFavoriteCity(data.id)}
          >
            <Icon
              size={24}
              color="red"
              name={data.favorite ? "favorite" : "favorite-border"}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}