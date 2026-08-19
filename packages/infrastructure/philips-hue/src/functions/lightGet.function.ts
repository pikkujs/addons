import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const LightGetInput = z.object({
  q: z.string().optional(),
})

export const LightGetOutput = z.record(z.string(), z.unknown())

export const lightGet = pikkuSessionlessFunc({
  description: "Light get",
  input: LightGetInput,
  output: LightGetOutput,
  func: async ({ philipsHue }, data) => {
    return philipsHue.call("GET", "/lights/{id}", data) as any
  },
})
