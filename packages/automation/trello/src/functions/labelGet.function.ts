import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelGetInput = z.object({
  id: z.string(),
})

export const LabelGetOutput = z.record(z.string(), z.unknown())

export const labelGet = pikkuSessionlessFunc({
  description: "Get a label",
  input: LabelGetInput,
  output: LabelGetOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/labels/{id}", data) as any
  },
})
