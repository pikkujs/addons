import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EpicGetAllInput = z.object({
  project: z.string().optional(),
})

export const EpicGetAllOutput = z.record(z.string(), z.unknown())

export const epicGetAll = pikkuSessionlessFunc({
  description: "EpicGetAll",
  input: EpicGetAllInput,
  output: EpicGetAllOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/epics", data) as any
  },
})
