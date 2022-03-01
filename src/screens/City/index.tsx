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
import { ptBR } from 'date-fns/locale'

import { Card } from '../../components/Card';

import { CitiesAddedProps } from '../../contexts/CitiesContext';

import { api } from '../../services/api';
import { apiKey } from '../../services/apiKey';

import { styles } from './styles';
import theme from '../../global/theme';

interface RouteCityProps {
  route: {
    params: {
      name: string;
      latitude: string;
      longitude: string;
    }
  }
}

export function City({ route }: RouteCityProps) {
  const {
    name,
    latitude,
    longitude
  } = route.params;

  const [loading, setLoading] = useState(true);
  const [listDays, setListDays] = useState<CitiesAddedProps[] | []>([]);
  const weekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  ];

  useEffect(() => {
    async function loadData() {
      await api.get(`onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts,current&units=metric&lang=pt_br&appid=${apiKey}`)
        .then((response) => {
          response.data.daily.map((item: any) => {
            const necessaryValues = {
              id: String(new Date().getTime()),
              city: new Date(item.dt * 1000).getDate() === new Date().getDate()
                ? "Hoje"
                : String(weekDays[new Date(item.dt * 1000).getDay()]),
              subtitle: format(new Date(item.dt * 1000), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
              temperature: Math.round(item.temp.day),
              temp_max: Math.round(item.temp.max),
              temp_min: Math.round(item.temp.min),
              description: item.weather[0].description,
            }

            setListDays(oldState => [...oldState, necessaryValues])
          })
        })
        .catch((error) => {
          Alert.alert(`Erro ao buscar dados da cidade de ${name}`)
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
              Previsão do tempo para os próximos {listDays.length} dias
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