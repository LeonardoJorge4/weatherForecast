import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiKey } from '../services/apiKey';
import { api, apiCities } from '../services/api';

interface CitiesContextData {
  city: string;
  cityFinded: string;
  loadingAddCity: boolean;
  loadingFindCity: boolean;
  citiesAdded: CitiesAddedProps[] | [];

  setCity: (city: string) => void;
  setCityFinded: (cityFinded: string) => void;
  setLoadingAddCity: (loadingAddCity: boolean) => void;
  setLoadingFindCity: (loadingFindCity: boolean) => void;
  setCitiesAdded: (citiesAdded: CitiesAddedProps[]) => void;

  handleFindCities: () => void;
  handleAddCity: () => void;
  handleFavoriteCity: (id: string) => void;
  handleRemoveCity: (id: string, cityName: string) => void;
}
export interface CitiesAddedProps {
  id: string;
  city: string;
  subtitle: string;
  favorite?: boolean;
  longitude?: string | any;
  latitude?: string | any;
  description: string;
  temp_max: number;
  temp_min: number;
  temperature: number;
}

const CitiesContext = createContext<CitiesContextData>({} as CitiesContextData)

export const CitiesProvider: React.FC = ({ children }) => {
  const [city, setCity] = useState('');
  const [cityFinded, setCityFinded] = useState('');
  const [loadingAddCity, setLoadingAddCity] = useState(false);
  const [loadingFindCity, setLoadingFindCity] = useState(false);
  const [citiesAdded, setCitiesAdded] = useState<CitiesAddedProps[] | []>([]);

  useEffect(() => {
    async function loadData() {
      const allCitiesAdded = await AsyncStorage.getItem("@WeatherForecastApp:AddedCities");

      if (allCitiesAdded) {
        setCitiesAdded(JSON.parse(allCitiesAdded))
      }
    }

    loadData();
  }, [citiesAdded])

  async function handleFindCities() {
    setLoadingFindCity(true)
    
    if (city === "") {
      Alert.alert("Informe uma cidade para fazer a pesquisa")
    } else {
      await apiCities.get(`${!city.trim() ? city : city.split(' ').join('-')}`)
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
            favorite: false,
            longitude: String(response.data.coord.lon),
            latitude: String(response.data.coord.lat),
            temperature: Math.round(response.data.main.temp),
            temp_max: Math.round(response.data.main.temp_max),
            temp_min: Math.round(response.data.main.temp_min),
            description: response.data.weather[0].description
          }

          setCitiesAdded([...citiesAdded, cityInformation])

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

  async function handleFavoriteCity(id: string) {
    citiesAdded.filter(city => {
      city.id === id
      ? city.favorite = !city.favorite
      : city
    })

    await AsyncStorage.setItem(
      '@WeatherForecastApp:AddedCities',
      JSON.stringify(
        [...citiesAdded]
      )
    )
  }

  async function handleRemoveCity(id: string, cityName: string) {
    Alert.alert(`Tem certeza que deseja remover a cidade de ${cityName}?`, "", [
      {
        text: "Voltar",
        onPress: () => {},
        style: "cancel"
      },
      { 
        text: "OK", onPress: async () => {
          const data = citiesAdded.filter(
            item => item.id !== id
          )
      
          await AsyncStorage.setItem(
            '@WeatherForecastApp:AddedCities',
            JSON.stringify(
              data
            )
          )
        }
      }
    ])
  } 
  
  return (
    <CitiesContext.Provider value={{
      city,
      cityFinded,
      loadingAddCity,
      loadingFindCity,
      citiesAdded,

      setCity,
      setCityFinded,
      setLoadingAddCity,
      setLoadingFindCity,
      setCitiesAdded,
      
      handleFindCities,
      handleAddCity,
      handleFavoriteCity,
      handleRemoveCity,
    }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CitiesContext)

  return context;
}