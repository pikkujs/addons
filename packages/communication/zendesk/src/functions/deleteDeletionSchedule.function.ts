import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteDeletionScheduleInput = z.object({
  deletion_schedule_id: z.number().int().describe("The id of the deletion schedule. Example: 132828"),
})

export const deleteDeletionSchedule = pikkuSessionlessFunc({
  description: "Deletes a deletion schedule by its id.\n\n#### Allowed For\n\n* Admins",
  input: DeleteDeletionScheduleInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/deletion_schedules/{deletion_schedule_id}", data)
  },
})
