import React from 'react';
import { Text, View } from 'react-native';

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import theme from '../../global/theme';

interface Props {
  iconName: string;
  title: string;
  subtitle?: string;
}

export function NoDataMessage({ iconName, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Icon
        size={42}
        name={iconName}
        color={theme.colors.gray}
      />

      <Text style={styles.title}>
        {title}
      </Text>

      {
        subtitle &&
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      }
    </View>
  )
}