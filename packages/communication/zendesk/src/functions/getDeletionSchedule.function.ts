import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetDeletionScheduleInput = z.object({
  deletion_schedule_id: z.number().int().describe("The id of the deletion schedule. Example: 132828"),
})

export const GetDeletionScheduleOutput = z.object({
  deletion_schedule: z.object({
    active: z.boolean().optional().describe("Whether the deletion schedule is active"),
    conditions: z.object({
      all: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical AND. Tickets must fulfill all of the conditions to be considered matching"),
      any: z.array(z.object({
        field: z.string().optional().describe("The name of a ticket field"),
        operator: z.string().optional().describe("A comparison operator"),
        value: z.string().optional().describe("The value of a ticket field"),
      })).optional().describe("Logical OR. Tickets may satisfy any of the conditions to be considered matching"),
    }).optional().describe("An object that describes the conditions under which the automation will execute. See [Conditions reference](/documentation/ticketing/reference-guides/conditions-reference)"),
    created_at: z.string().datetime().optional().describe("The time the deletion schedule was created"),
    default: z.boolean().optional().describe("Whether the deletion schedule is the default"),
    description: z.string().optional().describe("The description of the deletion schedule"),
    id: z.number().int().optional().describe("The id of the deletion schedule"),
    object: z.string().optional().describe("Represents the entity the schedule will delete. Cannot be modified after schedule creation. Can be one of `'zen:ticket'`, `'zen:user'`, `'zen:attachment'`, `'zen:bot_only_conversation'`, or `'zen:custom_object:CUSTOM_OBJECT_KEY'`."),
    title: z.string().optional().describe("The title of the deletion schedule"),
    updated_at: z.string().datetime().optional().describe("The time the deletion schedule was last updated"),
    url: z.string().optional().describe("Url for obtaining the deletion schedule JSON"),
  }).optional(),
})

export const getDeletionSchedule = pikkuSessionlessFunc({
  description: "Gets a deletion schedule by its id.\n\n#### Allowed For\n\n* Admins",
  input: GetDeletionScheduleInput,
  output: GetDeletionScheduleOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/deletion_schedules/{deletion_schedule_id}", data) as any
  },
})
