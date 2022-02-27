import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { styles } from './styles';

export function Input() {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input} 
        returnKeyType="send"
        selectionColor="#666666"
        placeholderTextColor="#B2B2B2"
        placeholder="Pesquise uma cidade..."
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
      >
        <Icon
          size={24}
          name="search"
          color="#B2B2B2"
        />
      </TouchableOpacity>
    </View>
  )
}