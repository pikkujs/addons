import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const DeleteTriggerCategoryInput = z.object({
  trigger_category_id: z.string().describe("The id of the ticket trigger category to delete. Example: \"10001\""),
})

export const deleteTriggerCategory = pikkuSessionlessFunc({
  description: "Deletes the ticket trigger category with the specified ID.",
  input: DeleteTriggerCategoryInput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/trigger_categories/{trigger_category_id}", data)
  },
})
