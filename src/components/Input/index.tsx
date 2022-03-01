import React from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

type Props = {
  city: string;
  loading: boolean;
  setCity: (city: string) => void;
  findCity: () => void;
}

export function Input({ city, loading, setCity, findCity }: Props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={city}
        style={styles.input} 
        returnKeyType="send"
        onChangeText={setCity}
        selectionColor="#666666"
        placeholderTextColor="#B2B2B2"
        placeholder="Pesquise uma cidade..."
      />
      {
        loading
        ? <ActivityIndicator
            size="small"
            color="#B2B2B2"
            style={styles.addButton}
          />
        : <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addButton}
            onPress={findCity}
          >
            <Icon
              size={24}
              name="search"
              color="#B2B2B2"
            />
          </TouchableOpacity>
      }

    </View>
  )
}