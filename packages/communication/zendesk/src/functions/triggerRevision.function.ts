import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TriggerRevisionInput = z.object({
  trigger_id: z.number().int().describe("The ID of the trigger. Example: 198"),
  trigger_revision_id: z.number().int().describe("The ID of the revision for a particular trigger. Example: 1"),
})

export const TriggerRevisionOutput = z.object({
  trigger_revision: z.object({
    author_id: z.number().int().optional(),
    created_at: z.string().optional(),
    id: z.number().int().optional(),
    snapshot: z.object({
      actions: z.array(z.object({
        field: z.string().optional(),
        value: z.union([z.string(), z.number().int(), z.array(z.union([z.string(), z.number().int()]))]).optional(),
      })).optional(),
      active: z.boolean().optional(),
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
      description: z.string().nullable().optional(),
      title: z.string().optional(),
    }).optional(),
    url: z.string().optional(),
  }).optional(),
})

export const triggerRevision = pikkuSessionlessFunc({
  description: "Fetches a revision associated with a ticket trigger. Ticket trigger revision history is only available on Enterprise plans.\n\n#### Allowed For\n\n * Agents\n\n#### Sideloads\n\nThe following sideloads are supported:\n\n| Name  | Will sideload\n| ----- | -------------\n| users | The user that authored each revision",
  input: TriggerRevisionInput,
  output: TriggerRevisionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/triggers/{trigger_id}/revisions/{trigger_revision_id}", data) as any
  },
})
