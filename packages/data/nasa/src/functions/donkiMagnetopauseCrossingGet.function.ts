import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DonkiMagnetopauseCrossingGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiMagnetopauseCrossingGetOutput = z.record(z.string(), z.unknown())

export const donkiMagnetopauseCrossingGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI magnetopause crossing data",
  input: DonkiMagnetopauseCrossingGetInput,
  output: DonkiMagnetopauseCrossingGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/MPC", data) as any
  },
})
