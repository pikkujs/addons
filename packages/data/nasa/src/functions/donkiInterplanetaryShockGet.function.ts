import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DonkiInterplanetaryShockGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  location: z.string().optional(),
  catalog: z.string().optional(),
})

export const DonkiInterplanetaryShockGetOutput = z.record(z.string(), z.unknown())

export const donkiInterplanetaryShockGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI interplanetary shock data",
  input: DonkiInterplanetaryShockGetInput,
  output: DonkiInterplanetaryShockGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/IPS", data) as any
  },
})
