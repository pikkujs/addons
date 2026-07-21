import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SequenceGetAllOutput = z.record(z.string(), z.unknown())

export const sequenceGetAll = pikkuSessionlessFunc({
  description: "SequenceGetAll",
  output: SequenceGetAllOutput,
  func: async ({ convertkit }) => {
    return convertkit.call("GET", "/sequences") as any
  },
})
