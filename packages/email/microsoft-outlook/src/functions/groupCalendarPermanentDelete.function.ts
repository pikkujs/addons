import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GroupCalendarPermanentDeleteInput = z.object({
  "group-id": z.string().describe("The unique identifier of group"),
})

export const groupCalendarPermanentDelete = pikkuSessionlessFunc({
  input: GroupCalendarPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/groups/{group-id}/calendar/microsoft.graph.permanentDelete", data)
  },
})
