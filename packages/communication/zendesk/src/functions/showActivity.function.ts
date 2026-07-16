import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowActivityInput = z.object({
  activity_id: z.number().int().describe("The activity ID. Example: 29183462"),
})

export const ShowActivityOutput = z.object({
  activity: z.object({
    actor: z.unknown().optional().describe("The full user record of the user responsible for the ticket activity. See [Users](/api-reference/ticketing/users/users/)"),
    actor_id: z.number().int().optional().describe("The id of the user responsible for the ticket activity. An `actor_id` of \"-1\" is a Zendesk system user, such as an automations action."),
    created_at: z.string().optional().describe("When the record was created"),
    id: z.number().int().optional().describe("Automatically assigned on creation"),
    object: z.record(z.string(), z.unknown()).optional().describe("The content of the activity. Can be a ticket, comment, or change."),
    target: z.record(z.string(), z.unknown()).optional().describe("The target of the activity, a ticket."),
    title: z.string().optional().describe("Description of the activity"),
    updated_at: z.string().optional().describe("When the record was last updated"),
    url: z.string().optional().describe("The API url of the activity"),
    user: z.unknown().optional().describe("The full user record of the agent making the request. See [Users](/api-reference/ticketing/users/users/)"),
    user_id: z.number().int().optional().describe("The id of the agent making the request"),
    verb: z.string().optional().describe("The type of activity. Can be \"tickets.assignment\", \"tickets.comment\", or \"tickets.priority_increase\""),
  }).optional(),
})

export const showActivity = pikkuSessionlessFunc({
  description: "Lists a specific activity.\n\n#### Allowed For\n\n* Agents",
  input: ShowActivityInput,
  output: ShowActivityOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/activities/{activity_id}", data) as any
  },
})
