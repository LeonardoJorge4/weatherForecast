import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useCity } from '../../contexts/CitiesContext';

import theme from '../../global/theme';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  icon: string;
}

export function ButtonWithIcon({ icon, ...rest }: ButtonProps) {
  const { loadingFindCity } = useCity();
  
  return (
    loadingFindCity
    ? <ActivityIndicator
        size="small"
        style={styles.button}
        color={theme.colors.gray}
      />
    : <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        {...rest}
      >
        <Icon
          size={24}
          name={icon}
          color={theme.colors.gray}
        />
      </TouchableOpacity>
  )
}