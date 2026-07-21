import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DonkiSolarEnergeticParticleGetInput = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export const DonkiSolarEnergeticParticleGetOutput = z.record(z.string(), z.unknown())

export const donkiSolarEnergeticParticleGet = pikkuSessionlessFunc({
  description: "Retrieve DONKI solar energetic particle data",
  input: DonkiSolarEnergeticParticleGetInput,
  output: DonkiSolarEnergeticParticleGetOutput,
  func: async ({ nasa }, data) => {
    return nasa.call("GET", "/DONKI/SEP", data) as any
  },
})
