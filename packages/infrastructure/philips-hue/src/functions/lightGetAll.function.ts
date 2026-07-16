import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LightGetAllInput = z.object({
  q: z.string().optional(),
})

export const LightGetAllOutput = z.record(z.string(), z.unknown())

export const lightGetAll = pikkuSessionlessFunc({
  description: "Light get all",
  input: LightGetAllInput,
  output: LightGetAllOutput,
  func: async ({ philipsHue }, data) => {
    return philipsHue.call("GET", "/lights", data) as any
  },
})
