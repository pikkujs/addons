import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DonkiRadiationBeltEnhancementGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiRadiationBeltEnhancementGetOutput = z.record(z.string(), z.unknown())

export const donkiRadiationBeltEnhancementGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI radiation belt enhancement data",
  input: DonkiRadiationBeltEnhancementGetInput,
  output: DonkiRadiationBeltEnhancementGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/RBE", data) as any
  },
})
