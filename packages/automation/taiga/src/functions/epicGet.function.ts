import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EpicGetInput = z.object({
  id: z.string(),
})

export const EpicGetOutput = z.record(z.string(), z.unknown())

export const epicGet = pikkuSessionlessFunc({
  description: "EpicGet",
  input: EpicGetInput,
  output: EpicGetOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/epics/{id}", data) as any
  },
})
