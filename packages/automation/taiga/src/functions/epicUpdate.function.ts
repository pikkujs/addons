import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const EpicUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
})

export const EpicUpdateOutput = z.record(z.string(), z.unknown())

export const epicUpdate = pikkuSessionlessFunc({
  description: "EpicUpdate",
  input: EpicUpdateInput,
  output: EpicUpdateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("PATCH", "/epics/{id}", data) as any
  },
})
