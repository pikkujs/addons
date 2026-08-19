import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupUpdateEventInput = z.any()

export const GroupUpdateEventOutput = z.any()

export const groupUpdateEvent = pikkuSessionlessFunc({
  input: GroupUpdateEventInput,
  output: GroupUpdateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("PATCH", "/groups/{group-id}/events/{event-id}", data) as any
  },
})
