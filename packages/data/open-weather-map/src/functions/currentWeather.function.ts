import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CurrentWeatherInput = z.object({
  q: z.string().optional().describe("City name"),
  id: z.number().optional().describe("City ID"),
  lat: z.string().optional().describe("Latitude"),
  lon: z.string().optional().describe("Longitude"),
  zip: z.string().optional().describe("Zip code"),
  units: z.string().optional().describe("Units format"),
  lang: z.string().optional().describe("Language code"),
})

export const CurrentWeatherOutput = z.object({
  name: z.string().optional(),
  cod: z.number().optional(),
})

export const currentWeather = pikkuSessionlessFunc({
  description: "Get current weather data",
  input: CurrentWeatherInput,
  output: CurrentWeatherOutput,
  func: async ({ openWeatherMap }, data) => {
    return openWeatherMap.call("GET", "/weather", data) as any
  },
})
