import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListQueuesOutput = z.object({
  queues: z.array(z.object({
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
  })).optional(),
})

export const listQueues = pikkuSessionlessFunc({
  description: "Returns all active queues for an account.\n\n#### Allowed For\n\n* Admins",
  output: ListQueuesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/queues") as any
  },
})
