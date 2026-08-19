import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateQueueInput = z.object({
  queue_id: z.string().describe("The id of the omnichannel routing queue. Example: \"01HG80ATNNZK1N7XRFVKX48XD6\""),
})

export const UpdateQueueOutput = z.object({
  queue: z.object({
    created_at: z.string().datetime().optional().describe("The time the queue was created"),
    definition: z.object({
      all: z.array(z.object({
        field: z.string().optional(),
        operator: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      any: z.array(z.object({
        field: z.string().optional(),
        operator: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
    }).optional().describe("Conditions when queue could be applied"),
    description: z.string().optional().describe("The description of the queue"),
    id: z.string().optional().describe("Automatically assigned when creating queue"),
    name: z.string().optional().describe("The name of the queue"),
    order: z.number().int().optional().describe("The queue-applied order"),
    primary_groups: z.object({
      count: z.number().int().optional(),
      groups: z.array(z.object({
        id: z.number().int().optional(),
        name: z.string().optional(),
      })).optional(),
    }).optional().describe("Primary group ids linked to the queue"),
    priority: z.number().int().optional().describe("The queue-applied priority"),
    secondary_groups: z.object({
      count: z.number().int().optional(),
      groups: z.array(z.object({
        id: z.number().int().optional(),
        name: z.string().optional(),
      })).optional(),
    }).optional().describe("Secondary group ids linked to the queue"),
    updated_at: z.string().datetime().optional().describe("The time of the queue's last update"),
    url: z.string().optional().describe("The API URL of the queue"),
  }).optional(),
})

export const updateQueue = pikkuSessionlessFunc({
  description: "Updates the queue definition for a given queue id.\n#### Allowed For\n\n* Admins",
  input: UpdateQueueInput,
  output: UpdateQueueOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/queues/{queue_id}", data) as any
  },
})
