import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarCreateEventInput = z.any()

export const GroupCalendarCreateEventOutput = z.any()

export const groupCalendarCreateEvent = pikkuSessionlessFunc({
  input: GroupCalendarCreateEventInput,
  output: GroupCalendarCreateEventOutput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/events", data) as any
  },
})
