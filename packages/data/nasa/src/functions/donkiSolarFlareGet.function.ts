import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DonkiSolarFlareGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiSolarFlareGetOutput = z.record(z.string(), z.unknown())

export const donkiSolarFlareGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI solar flare data",
  input: DonkiSolarFlareGetInput,
  output: DonkiSolarFlareGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/FLR", data) as any
  },
})
