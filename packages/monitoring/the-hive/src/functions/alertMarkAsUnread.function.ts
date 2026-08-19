import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertMarkAsUnreadInput = z.object({
  id: z.string(),
})

export const AlertMarkAsUnreadOutput = z.record(z.string(), z.unknown())

export const alertMarkAsUnread = pikkuSessionlessFunc({
  description: "Mark an alert as unread",
  input: AlertMarkAsUnreadInput,
  output: AlertMarkAsUnreadOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/{id}/markAsUnread", data) as any
  },
})
