import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LightDeleteInput = z.object({
  body: z.string().optional(),
})

export const LightDeleteOutput = z.record(z.string(), z.unknown())

export const lightDelete = pikkuSessionlessFunc({
  description: "Light delete",
  input: LightDeleteInput,
  output: LightDeleteOutput,
  func: async ({ philipsHue }, data) => {
    return philipsHue.call("DELETE", "/lights/{id}", data) as any
  },
})
