import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UnsubscribeDeleteInput = z.object({
  email: z.string(),
})

export const UnsubscribeDeleteOutput = z.record(z.string(), z.unknown())

export const unsubscribeDelete = pikkuSessionlessFunc({
  description: "Delete an email from the unsubscribe list",
  input: UnsubscribeDeleteInput,
  output: UnsubscribeDeleteOutput,
  func: async ({ lemlist }, data) => {
    return lemlist.call("DELETE", "/unsubscribes/{email}", data) as any
  },
})
