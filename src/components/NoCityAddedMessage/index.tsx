import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

export function NoCityAddedMessage() {
  return (
    <View style={styles.container}>
      <Icon
        size={42}
        name="frown"
        color="#B2B2B2"
      />
      <Text style={styles.text}>
        No momento, você não possui
        {`\n`}
        cidades adicionadas
      </Text>
    </View>
  )
}