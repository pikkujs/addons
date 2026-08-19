import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UserCalendarPermanentDeleteInput = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
})

export const userCalendarPermanentDelete = pikkuSessionlessFunc({
  input: UserCalendarPermanentDeleteInput,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendar/microsoft.graph.permanentDelete", data)
  },
})
