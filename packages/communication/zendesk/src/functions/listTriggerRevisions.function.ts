import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListTriggerRevisionsInput = z.object({
  trigger_id: z.number().int().describe("The ID of the trigger. Example: 198"),
})

export const ListTriggerRevisionsOutput = z.object({
  after_cursor: z.string().optional(),
  after_url: z.string().optional(),
  before_cursor: z.string().optional(),
  before_url: z.string().optional(),
  count: z.number().int().optional(),
  trigger_revisions: z.array(z.object({
    author_id: z.number().int().optional(),
    created_at: z.string().optional(),
    diff: z.object({
      actions: z.array(z.object({
        field: z.array(z.object({
          change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
          content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
        })).optional().describe("An array of [change](#change) objects."),
        value: z.array(z.object({
          change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
          content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
        })).optional().describe("An array of [change](#change) objects."),
      })).optional().describe("An array that contain [action diff objects](#Action Diffs)"),
      active: z.array(z.object({
        change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
        content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
      })).optional().describe("An array of [change](#change) objects"),
      conditions: z.object({
        field: z.array(z.object({
          change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
          content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
        })).optional().describe("An array of [change](#change) objects"),
        operator: z.array(z.object({
          change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
          content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
        })).optional().describe("An array of [change](#change) objects"),
        value: z.array(z.object({
          change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
          content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
        })).optional().describe("An array of [change](#change) objects"),
      }).optional(),
      description: z.array(z.object({
        change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
        content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
      })).optional().describe("An array of [change](#change) objects"),
      source_id: z.number().int().optional().describe("ID of the source revision"),
      target_id: z.number().int().optional().describe("ID of the target revision"),
      title: z.array(z.object({
        change: z.string().optional().describe("One of `-`, `+`, `=` representing the type of change"),
        content: z.union([z.boolean(), z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int(), z.boolean()]))]).optional().describe("The value of the item it represents"),
      })).optional().describe("An array of [change](#change) objects"),
    }).optional(),
    id: z.number().int().optional(),
    snapshot: z.object({
      actions: z.array(z.object({
        field: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      })).optional().describe("An array of [Actions](#actions) describing what the ticket trigger will do"),
      active: z.boolean().optional().describe("Whether the ticket trigger is active"),
      conditions: z.object({
        all: z.array(z.object({
          field: z.string().optional(),
          operator: z.string().optional(),
          value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
        })).nullable().optional(),
        any: z.array(z.object({
          field: z.string().optional(),
          operator: z.string().optional(),
          value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
        })).nullable().optional(),
      }).optional().describe("An object that describes the circumstances under which the trigger performs its actions. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
      description: z.string().nullable().optional().describe("The description of the ticket trigger"),
      title: z.string().optional().describe("The title of the ticket trigger"),
    }).optional(),
    url: z.string().optional(),
  })).optional(),
})

export const listTriggerRevisions = pikkuSessionlessFunc({
  description: "List the revisions associated with a ticket trigger. Ticket trigger revision history is only available on Enterprise plans.\n\n#### Allowed For\n\n * Agents\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name  | Will sideload\n| ----- | -------------\n| users | The user that authored each revision\n\n#### Pagination\n\nThis endpoint uses cursor-based pagination. The records are ordered in\ndescending order by the `created_at` timestamp, then by `id` on duplicate\n`created_at` values.\n\nThe `cursor` parameter is a non-human-readable argument you can use to move\nforward or backward in time.\n\nEach JSON response will contain the following attributes to help you get\nmore results:\n\n- `after_url` requests more recent results\n- `before_url` requests older results\n- `after_cursor` is the cursor to build the request yourself\n- `before_cursor` is the cursor to build the request yourself\n\nThe properties are null if no more records are available.\n\nYou can request a maximum of 1000 records using the `limit` parameter. If\nno `limit` parameter is supplied, it will default to 1,000.",
  input: ListTriggerRevisionsInput,
  output: ListTriggerRevisionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/triggers/{trigger_id}/revisions", data) as any
  },
})
