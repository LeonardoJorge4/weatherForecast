import React from 'react';
import { TextInput, View } from 'react-native';

import { ButtonWithIcon } from '../ButtonWithIcon';

import { useCity } from '../../contexts/CitiesContext';

import { translate } from '../../locales';

import { styles } from './styles';
import theme from '../../global/theme';

export function Input() {
  const {
    city,
    setCity,
    setCityFinded,
    handleFindCities
  } = useCity();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={city}
        style={styles.input} 
        returnKeyType="send"
        onChangeText={setCity}
        selectionColor="#666666"
        onSubmitEditing={handleFindCities}
        placeholder={translate('searchCity')}
        placeholderTextColor={theme.colors.gray}
      />

      {
        city !== "" &&
        <ButtonWithIcon 
          icon="x"
          onPress={() => {
            setCity("")
            setCityFinded("")
          }}
        />
      }

      <ButtonWithIcon
        icon="search"
        onPress={handleFindCities}
      />

    </View>
  )
}