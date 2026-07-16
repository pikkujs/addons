import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const UpdateTriggerCategoryInput = z.object({
  trigger_category_id: z.string().describe("The id of the ticket trigger category to update. Example: \"10001\""),
  trigger_category: z.object({
  name: z.string().optional(),
  position: z.number().int().optional(),
}).optional(),
})

export const UpdateTriggerCategoryOutput = z.object({
  trigger_category: z.object({
    created_at: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    position: z.number().int().optional(),
    updated_at: z.string().optional(),
  }).optional(),
})

export const updateTriggerCategory = pikkuSessionlessFunc({
  description: "Updates the ticket trigger category with the specified ID.",
  input: UpdateTriggerCategoryInput,
  output: UpdateTriggerCategoryOutput,
  errors: [BadRequestError, NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/trigger_categories/{trigger_category_id}", data) as any
  },
})
