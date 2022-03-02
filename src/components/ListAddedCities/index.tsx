import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Card } from '../Card';
import { NoDataMessage } from '../NoDataMessage';

import { useCity } from '../../contexts/CitiesContext';

import { translate } from '../../locales';

import { styles } from './styles';

export function ListAddedCities() {
  const navigation = useNavigation();
  const { citiesAdded, handleRemoveCity } = useCity();

  function handleNavigate(
    cityName: string,
    latitude: string,
    longitude: string,
    typeTemperature: string,
  ) {
    navigation.navigate(
      "City" as never,
      { 
        name: cityName,
        latitude: latitude,
        longitude: longitude,
        typeTemperature: typeTemperature
      } as never
    )
  }

  return (
    citiesAdded.length <= 0
    ? <View style={styles.containerNoData}>
        <NoDataMessage
          iconName="emoticon-sad-outline"
          title={translate('titleNoDataMessageCities')}
        />
      </View>
    : <View style={styles.container}>
        <Text style={styles.title}>
          {translate('addedCitiesText')}
        </Text>
        <FlatList
          data={citiesAdded}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onLongPress={() => handleRemoveCity(item.id, item.city)}
              onPress={() => {
                handleNavigate(
                  item.city, 
                  item.latitude, 
                  item.longitude,
                  item.typeTemperature
                )
              }}
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