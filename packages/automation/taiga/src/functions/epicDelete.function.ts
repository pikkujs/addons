import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EpicDeleteInput = z.object({
  id: z.string(),
})

export const EpicDeleteOutput = z.record(z.string(), z.unknown())

export const epicDelete = pikkuSessionlessFunc({
  description: "EpicDelete",
  input: EpicDeleteInput,
  output: EpicDeleteOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("DELETE", "/epics/{id}", data) as any
  },
})
