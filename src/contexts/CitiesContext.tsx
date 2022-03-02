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
  isCelcius: boolean;
  cityCountry: string;

  setCity: (city: string) => void;
  setCityFinded: (cityFinded: string) => void;
  setLoadingAddCity: (loadingAddCity: boolean) => void;
  setLoadingFindCity: (loadingFindCity: boolean) => void;
  setCitiesAdded: (citiesAdded: CitiesAddedProps[]) => void;
  setIsCelcius: (isCelcius: boolean) => void;

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
  typeTemperature: string;
  description: string;
  temp_max: number;
  temp_min: number;
  temperature: number;
}

const CitiesContext = createContext<CitiesContextData>({} as CitiesContextData)

export const CitiesProvider: React.FC = ({ children }) => {
  const [city, setCity] = useState(''); //Valor recebido do input de pesquisa
  const [cityFinded, setCityFinded] = useState('');
  const [loadingAddCity, setLoadingAddCity] = useState(false);
  const [loadingFindCity, setLoadingFindCity] = useState(false);
  const [citiesAdded, setCitiesAdded] = useState<CitiesAddedProps[] | []>([]);
  const [isCelcius, setIsCelcius] = useState(true); //true Celcius, false Fahrenheit
  const [cityCountry, setCityCountry] = useState('');

  useEffect(() => {
    async function loadData() {
      const allCitiesAdded = await AsyncStorage.getItem("@WeatherForecastApp:AddedCities");

      if (allCitiesAdded) {
        setCitiesAdded(JSON.parse(allCitiesAdded))
      }
    }

    loadData();
  }, [citiesAdded])

  //Busca as cidades para adicionar
  async function handleFindCities() {
    setLoadingFindCity(true)
    
    if (city === "") {
      Alert.alert("Informe uma cidade para fazer a pesquisa")
    } else {
      await apiCities.get(`direct?q=${!city.trim() ? city : city.split(' ').join('-')}&limit=1&lang=pt_br&appid=${apiKey}`)
        .then(response => {
          if (response.data.length <= 0) {
            Alert.alert("Cidade não encontrada")
          } else {
            setCityFinded(
              response.data[0].local_names.pt
              ? response.data[0].local_names.pt
              : response.data[0].local_names.es
            )
            setCityCountry(response.data[0].country)
          }
        })
        .catch(error => {
          Alert.alert("Erro ao buscar cidade")
          console.log(error)
        })
    }

    setLoadingFindCity(false)
  }

  //adiciona a cidade na lista do usuário
  async function handleAddCity() {
    const cityAlreadyExists = citiesAdded !== null
      ? citiesAdded.find((item) => item.city === cityFinded)
      : false

    if (cityAlreadyExists) {
      return Alert.alert("Cidade já adicionada")
    } else {
      setLoadingAddCity(true)

      await api.get(`weather?q=${cityFinded}&lang=pt_br&units=${isCelcius ? 'metric' : 'imperial'}&appid=${apiKey}`)
        .then(async (response) => {
          const cityInformation: CitiesAddedProps = {
            id: String(new Date().getTime()),
            city: cityFinded,
            subtitle: response.data.sys.country,
            favorite: false,
            typeTemperature: `°${isCelcius ? 'C' : 'F'}`,
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

  //adiciona a cidade na lista de favoritos do usuário
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

  //Remove uma cidade do usuário
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
      isCelcius,
      cityCountry,

      setCity,
      setCityFinded,
      setLoadingAddCity,
      setLoadingFindCity,
      setCitiesAdded,
      setIsCelcius,
      
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