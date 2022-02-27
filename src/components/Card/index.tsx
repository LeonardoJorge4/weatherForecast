import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { styles } from './styles';

export function Card() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Blumenau</Text>
        <Text>Brasil</Text>
        <Text>Chuva Fraca</Text>
        <Text>14° - 22°</Text>
      </View>

      <View>
        <Text>18°</Text>
        <TouchableOpacity
          activeOpacity={0.7}
        >
          <Icon 
            size={24}
            color="red"
            name="favorite-border"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}