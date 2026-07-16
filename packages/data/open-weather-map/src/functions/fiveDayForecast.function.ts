import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const FiveDayForecastInput = z.object({
  q: z.string().optional().describe("City name"),
  id: z.number().optional().describe("City ID"),
  lat: z.string().optional().describe("Latitude"),
  lon: z.string().optional().describe("Longitude"),
  zip: z.string().optional().describe("Zip code"),
  units: z.string().optional().describe("Units format"),
  lang: z.string().optional().describe("Language code"),
})

export const FiveDayForecastOutput = z.object({
  cod: z.string().optional(),
  cnt: z.number().optional(),
})

export const fiveDayForecast = pikkuSessionlessFunc({
  description: "Get 5 day weather forecast",
  input: FiveDayForecastInput,
  output: FiveDayForecastOutput,
  func: async ({ openWeatherMap }, data) => {
    return openWeatherMap.call("GET", "/forecast", data) as any
  },
})
