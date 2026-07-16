import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LightUpdateInput = z.object({
  body: z.string().optional(),
})

export const LightUpdateOutput = z.record(z.string(), z.unknown())

export const lightUpdate = pikkuSessionlessFunc({
  description: "Light update",
  input: LightUpdateInput,
  output: LightUpdateOutput,
  func: async ({ philipsHue }, data) => {
    return philipsHue.call("POST", "/lights/{id}/state", data) as any
  },
})
