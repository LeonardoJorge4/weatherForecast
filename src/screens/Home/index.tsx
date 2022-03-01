import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { CardAddCity } from '../../components/CardAddCity';
import { NoCityAddedMessage } from '../../components/NoCityAddedMessage';

import { apiKey } from '../../services/apiKey';
import { api, apiCities } from '../../services/api';

import { styles } from './styles';

export interface CitiesAddedProps {
  id: string;
  city: string;
  subtitle: string;
  longitude?: string | any;
  latitude?: string | any;
  description: string;
  temp_max: number;
  temp_min: number;
  temperature: number;
}

export function Home() {
  const navigation = useNavigation();

  const [city, setCity] = useState('');
  const [cityFinded, setCityFinded] = useState('');
  const [loadingAddCity, setLoadingAddCity] = useState(false);
  const [loadingFindCity, setLoadingFindCity] = useState(false);
  const [citiesAdded, setCitiesAdded] = useState<CitiesAddedProps[] | null>(null);

  useEffect(() => {
    async function loadData() {
      const allCitiesAdded = await AsyncStorage.getItem("@WeatherForecastApp:AddedCities");

      if (allCitiesAdded) {
        setCitiesAdded(JSON.parse(allCitiesAdded))
      }
    }

    loadData()
  }, [citiesAdded])

  async function handleFindCities() {
    setLoadingFindCity(true)

    if (city === "") {
      Alert.alert("Informe uma cidade para fazer a pesquisa")
    } else {
      await apiCities.get(`${!city.trim() ? city : city.replace(' ', '-')}`)
        .then(response => {
          if (response.data.length <= 0) {
            Alert.alert("Cidade não encontrada")
          } else {
            setCityFinded(response.data.nome)
          }
        })
        .catch(error => {
          Alert.alert("Erro ao buscar cidade")
          console.log(error)
        })
    }

    setLoadingFindCity(false)
  }

  async function handleAddCity() {
    const cityAlreadyExists = citiesAdded !== null
      ? citiesAdded.find((item) => item.city === cityFinded)
      : false

    if (cityAlreadyExists) {
      return Alert.alert("Cidade já adicionada")
    } else {
      setLoadingAddCity(true)

      await api.get(`weather?q=${cityFinded}&lang=pt_br&units=metric&appid=${apiKey}`)
        .then(async (response) => {
          const cityInformation: CitiesAddedProps = {
            id: String(new Date().getTime()),
            city: cityFinded,
            subtitle: "Brasil",
            longitude: String(response.data.coord.lon),
            latitude: String(response.data.coord.lat),
            temperature: Math.round(response.data.main.temp),
            temp_max: Math.round(response.data.main.temp_max),
            temp_min: Math.round(response.data.main.temp_min),
            description: response.data.weather[0].description
          }
          
          setCitiesAdded(oldState => oldState ? [...oldState, cityInformation] : [cityInformation])

          await AsyncStorage.setItem(
            '@WeatherForecastApp:AddedCities',
            JSON.stringify(
              citiesAdded
                ? [...citiesAdded, cityInformation]
                : [cityInformation]
            )
          )
          setCityFinded("")
          setCity("")
        })
        .catch(error => {
          Alert.alert("Erro ao adicionar cidade")
          console.log(error)
        })

      setLoadingAddCity(false)
    }
  }

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>

          <Input
            city={city}
            setCity={setCity}
            loading={loadingFindCity}
            findCity={handleFindCities}
          />

          {
            cityFinded !== "" &&
            <CardAddCity
              name={cityFinded}
              addCity={handleAddCity}
              loading={loadingAddCity}
            />
          }

          {
            citiesAdded
              ? <View style={styles.container}>
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
              : <NoCityAddedMessage />
          }

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}