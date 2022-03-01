import axios from "axios";

export const apiCities = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/',
})

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})