import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ShowTriggerCategoryByIdInput = z.object({
  trigger_category_id: z.string().describe("The id of the ticket trigger category to retrieve. Example: \"10001\""),
})

export const ShowTriggerCategoryByIdOutput = z.object({
  trigger_category: z.object({
    created_at: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    position: z.number().int().optional(),
    updated_at: z.string().optional(),
  }).optional(),
})

export const showTriggerCategoryById = pikkuSessionlessFunc({
  description: "Returns the ticket trigger category with the specified ID.",
  input: ShowTriggerCategoryByIdInput,
  output: ShowTriggerCategoryByIdOutput,
  errors: [NotFoundError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/trigger_categories/{trigger_category_id}", data) as any
  },
})
