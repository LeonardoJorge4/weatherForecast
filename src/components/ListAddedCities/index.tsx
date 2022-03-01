import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Card } from '../Card';
import { NoCityAddedMessage } from '../NoCityAddedMessage';

import { useCity } from '../../contexts/CitiesContext';

import { styles } from './styles';

export function ListAddedCities() {
  const navigation = useNavigation();
  const { citiesAdded } = useCity();

  function handleNavigate(
    cityName: string,
    latitude: string,
    longitude: string
  ) {
    navigation.navigate(
      "City" as never,
      { 
        name: cityName,
        latitude: latitude,
        longitude: longitude
      } as never
    )
  }

  return (
    !citiesAdded
    ? <NoCityAddedMessage />
    : <View style={styles.container}>
        <Text style={styles.title}>
          Cidades adicionadas
        </Text>
        <FlatList
          data={citiesAdded}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleNavigate(item.city, item.latitude, item.longitude)}
            >
              <Card
                data={item}
                hasFavorite
              />
            </TouchableOpacity>
          )}
        />
      </View>
  )
}