import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UnsubscribeAddInput = z.object({
  email: z.string(),
})

export const UnsubscribeAddOutput = z.record(z.string(), z.unknown())

export const unsubscribeAdd = pikkuSessionlessFunc({
  description: "Add an email to the unsubscribe list",
  input: UnsubscribeAddInput,
  output: UnsubscribeAddOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("POST", "/unsubscribes/{email}", data) as any
  },
})
