import axios from "axios";

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const apiCities = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/',
})
