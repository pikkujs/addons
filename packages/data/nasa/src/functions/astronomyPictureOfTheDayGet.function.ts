import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AstronomyPictureOfTheDayGetInput = z.object({
  date: z.string().optional(),
})

export const AstronomyPictureOfTheDayGetOutput = z.record(z.string(), z.unknown())

export const astronomyPictureOfTheDayGet = pikkuSessionlessFunc({
  description: "Get the Astronomy Picture of the Day",
  input: AstronomyPictureOfTheDayGetInput,
  output: AstronomyPictureOfTheDayGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/planetary/apod", data) as any
  },
})
