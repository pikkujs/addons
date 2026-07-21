import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TeamProfileGetInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users.profile:read`"),
  visibility: z.string().optional().describe("Filter by visibility."),
})

export const TeamProfileGetOutput = z.object({
  ok: z.literal(true),
  profile: z.object({
    fields: z.array(z.object({
      field_name: z.string().nullable().optional(),
      hint: z.string(),
      id: z.string().regex(new RegExp("^X[a-zA-Z0-9]{9,}$")),
      is_hidden: z.boolean().optional(),
      label: z.string(),
      options: z.unknown().optional(),
      ordering: z.number(),
      possible_values: z.array(z.string()).nullable().optional(),
      type: z.enum(["text", "date", "link", "mailto", "options_list", "user"]),
    })),
  }),
}).describe("Schema for successful response from team.profile.get method")

export const teamProfileGet = pikkuSessionlessFunc({
  description: "Retrieve a team's profile.",
  input: TeamProfileGetInput,
  output: TeamProfileGetOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/team.profile.get", data) as any
  },
})
