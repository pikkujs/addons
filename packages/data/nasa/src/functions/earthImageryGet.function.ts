import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EarthImageryGetInput = z.object({
  lat: z.number().optional(),
  lon: z.number().optional(),
  date: z.string().optional(),
  dim: z.number().optional(),
})

export const EarthImageryGetOutput = z.record(z.string(), z.unknown())

export const earthImageryGet = pikkuSessionlessFunc({
  description: "Retrieve Earth imagery",
  input: EarthImageryGetInput,
  output: EarthImageryGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/planetary/earth/imagery", data) as any
  },
})
