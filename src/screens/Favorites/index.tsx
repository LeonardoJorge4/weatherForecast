import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Card } from '../../components/Card';
import { NoDataMessage } from '../../components/NoDataMessage';

import { useCity } from '../../contexts/CitiesContext';

import { translate } from '../../locales';

import { styles } from './styles';

export function Favorites() {
  const { citiesAdded, handleRemoveCity } = useCity();
  const navigation = useNavigation();

  const [hasFavorite, setHasFavorite] = useState(false);
  const titleNoDataMessage = translate('titleNoDataMessageFavorites');
  const subtitleNoDataMessage = translate('subtitleNoDataMessageFavorites');

  useEffect(() => {
    function loadData() {
      citiesAdded.every((item) => {
        !item.favorite
        ? setHasFavorite(false)
        : setHasFavorite(true)
      })
    }

    loadData()
  }, [citiesAdded])

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
    <SafeAreaView style={styles.container}>
      {
        !hasFavorite &&
        <View style={styles.containerNoData}>
          <NoDataMessage
            iconName="heart-broken"
            title={titleNoDataMessage}
            subtitle={subtitleNoDataMessage}
          />
        </View>
      }

      <FlatList
        data={citiesAdded}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          item.favorite 
          ? <TouchableOpacity
              activeOpacity={0.7}
              onLongPress={() => handleRemoveCity(item.id, item.city)}
              onPress={() => handleNavigate(item.city, item.latitude, item.longitude)}
            >
              <Card
                data={item}
                hasFavorite
              />
            </TouchableOpacity>
          : null
        )}
      />
    </SafeAreaView>
  )
}