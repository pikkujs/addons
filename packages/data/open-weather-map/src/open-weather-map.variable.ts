import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const openWeatherMapBaseUrlSchema = z.enum(["https://api.openweathermap.org/data/2.5"]).default("https://api.openweathermap.org/data/2.5")

wireVariable({
  name: 'OPEN_WEATHER_MAP_BASE_URL',
  displayName: 'OpenWeatherMap Base URL',
  description: 'The base URL for the OpenWeatherMap API.',
  variableId: 'OPEN_WEATHER_MAP_BASE_URL',
  schema: openWeatherMapBaseUrlSchema,
})
