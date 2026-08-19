import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DonkiHighSpeedStreamGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiHighSpeedStreamGetOutput = z.record(z.string(), z.unknown())

export const donkiHighSpeedStreamGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI high speed stream data",
  input: DonkiHighSpeedStreamGetInput,
  output: DonkiHighSpeedStreamGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/HSS", data) as any
  },
})
