import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';

import { format } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'

import { Card } from '../../components/Card';

import { CitiesAddedProps, useCity } from '../../contexts/CitiesContext';

import { api } from '../../services/api';
import { apiKey } from '../../services/apiKey';

import { translate } from '../../locales';

import { styles } from './styles';
import theme from '../../global/theme';

interface RouteCityProps {
  route: {
    params: {
      name: string;
      latitude: string;
      longitude: string;
      typeTemperature: string;
    }
  }
}

export function City({ route }: RouteCityProps) {
  const {
    name,
    latitude,
    longitude,
    typeTemperature,
  } = route.params;
  const { language } = useCity();

  const [loading, setLoading] = useState(true);
  const [listDays, setListDays] = useState<CitiesAddedProps[] | []>([]);
  const weekDays = [
    translate('sunday'),
    translate('monday'),
    translate('tuesday'),
    translate('wednesday'),
    translate('thursday'),
    translate('friday'),
    translate('saturday')
  ];
  const dateTypeText = language === 'en_US' ? "yyyy-MM-dd" : "dd 'de' MMMM 'de' yyyy"

  useEffect(() => {
    async function loadData() {
      await api.get(`onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts,current&units=${typeTemperature === '°C' ? 'metric' : 'imperial'}&lang=${language === 'en_US' ? 'en_us' : 'pt_br'}&appid=${apiKey}`)
        .then((response) => {
          response.data.daily.map((item: any) => {
            const formatedDateSubtitle = format(
              new Date(item.dt * 1000),
              dateTypeText,
              { locale: language === 'en_US' ? enUS : ptBR }
            );
            const weekDayName = new Date(item.dt * 1000).getDate() === new Date().getDate()
              ? language === 'en_US' ? 'Today' : 'Hoje'
              : String(weekDays[new Date(item.dt * 1000).getDay()]);
            ;

            const necessaryValues = {
              id: String(new Date().getTime()),
              city: weekDayName,
              subtitle: formatedDateSubtitle,
              typeTemperature: typeTemperature,
              temperature: Math.round(item.temp.day),
              temp_max: Math.round(item.temp.max),
              temp_min: Math.round(item.temp.min),
              description: item.weather[0].description,
            }

            setListDays(oldState => [...oldState, necessaryValues])
          })
        })
        .catch((error) => {
          Alert.alert(`${translate('errorFindCity')} ${name}`)
          console.log(error)
        })
        .finally(() => setLoading(false))
    }

    loadData()
  }, [])

  return (
    loading
      ? <ActivityIndicator
          size="large"
          style={styles.loading}
          color={theme.colors.gray}
        />
      : <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {translate('titleForecastCity')} {listDays.length} {language !== 'en_US' && translate('daysText')}
            </Text>
            <ScrollView>
              {
                listDays.map((item) => (
                  <Card
                    data={item}
                    key={item.id}
                    hasFavorite={false}
                  />
                ))
              }
            </ScrollView>
          </View>
        </SafeAreaView>
  )
}