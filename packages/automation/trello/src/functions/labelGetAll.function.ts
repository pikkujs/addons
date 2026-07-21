import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelGetAllInput = z.object({
  idBoard: z.string(),
})

export const LabelGetAllOutput = z.record(z.string(), z.unknown())

export const labelGetAll = pikkuSessionlessFunc({
  description: "Get many labels",
  input: LabelGetAllInput,
  output: LabelGetAllOutput,
  func: async ({ trello }, data) => {
    return trello.call("GET", "/board/{idBoard}/labels", data) as any
  },
})
