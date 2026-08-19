import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DonkiWsaEnlilSimulationGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiWsaEnlilSimulationGetOutput = z.record(z.string(), z.unknown())

export const donkiWsaEnlilSimulationGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI WSA+Enlil simulation data",
  input: DonkiWsaEnlilSimulationGetInput,
  output: DonkiWsaEnlilSimulationGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/WSAEnlilSimulations", data) as any
  },
})
