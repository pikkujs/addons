import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserCalendarPermanentDelete2Input = z.object({
  "user-id": z.string().describe("The unique identifier of user"),
  "calendar-id": z.string().describe("The unique identifier of calendar"),
})

export const userCalendarPermanentDelete2 = pikkuSessionlessFunc({
  description: "Permanently delete a calendar folder and the events that it contains and remove them from the mailbox. For more information about item retention, see Configure deleted item retention and recoverable items quotas.",
  input: UserCalendarPermanentDelete2Input,
  func: async ({ microsoftOutlook }, data) => {
    return microsoftOutlook.call("POST", "/users/{user-id}/calendars/{calendar-id}/microsoft.graph.permanentDelete", data)
  },
})
