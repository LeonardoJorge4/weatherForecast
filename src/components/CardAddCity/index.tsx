import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
  name: string;
  loading: boolean;
  addCity: () => void;
}

export function CardAddCity({
  name,
  loading,
  addCity,
  ...rest
}: Props) {
  return (
    loading
    ? <ActivityIndicator
        size="large"
        color="#B2B2B2"
        style={styles.loading}
      />
    : <View style={styles.container}>
        <View>
          <Text style={styles.city}>
            {name}
          </Text>
          <Text style={styles.country}>
            Brasil
          </Text>
        </View>

        <TouchableOpacity
          onPress={addCity}
          disabled={loading}
          activeOpacity={0.7}
          style={styles.button}
          {...rest}
        >
          <Text style={styles.textButton}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
  )
}