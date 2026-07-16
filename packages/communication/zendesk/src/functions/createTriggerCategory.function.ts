import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const CreateTriggerCategoryInput = z.object({
  trigger_category: z.object({
  name: z.string(),
  position: z.number().int().optional(),
}).optional(),
})

export const CreateTriggerCategoryOutput = z.object({
  trigger_category: z.object({
    created_at: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    position: z.number().int().optional(),
    updated_at: z.string().optional(),
  }).optional(),
})

export const createTriggerCategory = pikkuSessionlessFunc({
  description: "Creates a ticket trigger category.",
  input: CreateTriggerCategoryInput,
  output: CreateTriggerCategoryOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/trigger_categories", data) as any
  },
})
