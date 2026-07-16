import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const VolumeGetInput = z.object({
  volumeId: z.string(),
})

export const VolumeGetOutput = z.record(z.string(), z.unknown())

export const volumeGet = pikkuSessionlessFunc({
  description: "Get a volume resource based on ID",
  input: VolumeGetInput,
  output: VolumeGetOutput,
  func: async ({ googleBooks }, data) => {
    return googleBooks.call("GET", "/v1/volumes/{volumeId}", data) as any
  },
})
