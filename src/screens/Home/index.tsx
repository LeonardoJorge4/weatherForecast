import React from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

import { Input } from '../../components/Input';
import { CardAddCity } from '../../components/CardAddCity';
import { ListAddedCities } from '../../components/ListAddedCities';

import { useCity } from '../../contexts/CitiesContext';

import { styles } from './styles';


export function Home() {
  const { cityFinded } = useCity()

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>

          <Input />

          {
            cityFinded !== "" &&
            <CardAddCity />
          }

          <ListAddedCities />

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}