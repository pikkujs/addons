import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCreateEventInput = z.any()

export const GroupCreateEventOutput = z.any()

export const groupCreateEvent = pikkuSessionlessFunc({
  description: "Use this API to create a new event.",
  input: GroupCreateEventInput,
  output: GroupCreateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/events", data) as any
  },
})
