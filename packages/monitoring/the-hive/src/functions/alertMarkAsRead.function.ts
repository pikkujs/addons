import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AlertMarkAsReadInput = z.object({
  id: z.string(),
})

export const AlertMarkAsReadOutput = z.record(z.string(), z.unknown())

export const alertMarkAsRead = pikkuSessionlessFunc({
  description: "Mark an alert as read",
  input: AlertMarkAsReadInput,
  output: AlertMarkAsReadOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("POST", "/alert/{id}/markAsRead", data) as any
  },
})
