import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { CitiesAddedProps } from '../../screens/Home';

import { styles } from './styles';

interface CardProps {
  data: CitiesAddedProps
  hasFavorite: boolean;
}

export function Card({ data, hasFavorite }: CardProps) {
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
          >
            <Icon 
              size={24}
              color="red"
              name="favorite-border"
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}