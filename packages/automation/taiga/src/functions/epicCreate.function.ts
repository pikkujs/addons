import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EpicCreateInput = z.object({
  project: z.string().optional(),
  subject: z.string().optional(),
})

export const EpicCreateOutput = z.record(z.string(), z.unknown())

export const epicCreate = pikkuSessionlessFunc({
  description: "EpicCreate",
  input: EpicCreateInput,
  output: EpicCreateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("POST", "/epics", data) as any
  },
})
