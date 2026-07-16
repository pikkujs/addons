import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EarthAssetsGetInput = z.object({
  lat: z.number().optional(),
  lon: z.number().optional(),
  date: z.string().optional(),
  dim: z.number().optional(),
})

export const EarthAssetsGetOutput = z.record(z.string(), z.unknown())

export const earthAssetsGet = pikkuSessionlessFunc({
  description: "Retrieve Earth assets",
  input: EarthAssetsGetInput,
  output: EarthAssetsGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/planetary/earth/assets", data) as any
  },
})
