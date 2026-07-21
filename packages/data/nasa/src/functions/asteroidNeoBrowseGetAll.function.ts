import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AsteroidNeoBrowseGetAllInput = z.object({
  size: z.number().optional(),
})

export const AsteroidNeoBrowseGetAllOutput = z.record(z.string(), z.unknown())

export const asteroidNeoBrowseGetAll = pikkuSessionlessFunc({
  description: "Browse the overall asteroid dataset",
  input: AsteroidNeoBrowseGetAllInput,
  output: AsteroidNeoBrowseGetAllOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/neo/rest/v1/neo/browse", data) as any
  },
})
