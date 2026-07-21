import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DonkiCoronalMassEjectionGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiCoronalMassEjectionGetOutput = z.record(z.string(), z.unknown())

export const donkiCoronalMassEjectionGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI coronal mass ejection data",
  input: DonkiCoronalMassEjectionGetInput,
  output: DonkiCoronalMassEjectionGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/CME", data) as any
  },
})
