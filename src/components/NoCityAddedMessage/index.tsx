import React from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';
import theme from '../../global/theme';

export function NoCityAddedMessage() {
  return (
    <View style={styles.container}>
      <Icon
        size={42}
        name="frown"
        color={theme.colors.gray}
      />
      <Text style={styles.text}>
        No momento, você não possui
        {`\n`}
        cidades adicionadas
      </Text>
    </View>
  )
}