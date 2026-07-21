import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const ListTriggerCategoriesInput = z.object({
  page: z.object({
  after: z.string().optional(),
  before: z.string().optional(),
  size: z.number().int().optional(),
}).optional().describe("Pagination parameters. Example: {\"after\":\"eyJvIjoiLXNjb3JlLGlkIiwidiI6ImFRSUFBQUFBQUFBQWFRMHBJUUVBQUFBQSJ9\",\"before\":\"eyJvIjoiLXNjb3JlLGlkIiwidiI6ImFRSUFBQUFBQUFBQWFRMHBJUUVBQUFBQSJ9\",\"size\":50}"),
  sort: z.enum(["position", "-position", "name", "-name", "created_at", "-created_at", "updated_at", "-updated_at"]).optional().describe("Sort parameters"),
  include: z.literal("rule_counts").optional().describe("Allowed sideloads"),
})

export const ListTriggerCategoriesOutput = z.object({
  trigger_categories: z.array(z.object({
    created_at: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    position: z.number().int().optional(),
    updated_at: z.string().optional(),
  })).optional(),
  links: z.object({
    next: z.string().optional(),
    prev: z.string().optional(),
  }).optional(),
  meta: z.object({
    after_cursor: z.string().optional(),
    before_cursor: z.string().optional(),
    has_more: z.boolean().optional(),
  }).optional(),
})

export const listTriggerCategories = pikkuSessionlessFunc({
  description: "Returns all the ticket trigger categories in the account.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).",
  input: ListTriggerCategoriesInput,
  output: ListTriggerCategoriesOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/trigger_categories", data) as any
  },
})
