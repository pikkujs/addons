import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VolumeGetAllInput = z.object({
  q: z.string(),
  maxResults: z.number().optional(),
})

export const VolumeGetAllOutput = z.record(z.string(), z.unknown())

export const volumeGetAll = pikkuSessionlessFunc({
  description: "Get many volumes filtered by query",
  input: VolumeGetAllInput,
  output: VolumeGetAllOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("GET", "/v1/volumes", data) as any
  },
})
