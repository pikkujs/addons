import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallsAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `calls:write`"),
  created_by: z.string().optional().describe("The valid Slack user ID of the user who created this Call. When this method is called with a user token, the `created_by` field is optional and defaults to the authed user of the token. Otherwise, the field is required."),
  date_start: z.number().int().optional().describe("Call start time in UTC UNIX timestamp format"),
  desktop_app_join_url: z.string().optional().describe("When supplied, available Slack clients will attempt to directly launch the 3rd-party Call with this URL."),
  external_display_id: z.string().optional().describe("An optional, human-readable ID supplied by the 3rd-party Call provider. If supplied, this ID will be displayed in the Call object."),
  external_unique_id: z.string().describe("An ID supplied by the 3rd-party Call provider. It must be unique across all Calls from that service."),
  join_url: z.string().describe("The URL required for a client to join the Call."),
  title: z.string().optional().describe("The name of the Call."),
  users: z.string().optional().describe("The list of users to register as participants in the Call. [Read more on how to specify users here](/apis/calls#users)."),
})

export const CallsAddOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsAdd = pikkuSessionlessFunc({
  description: "Registers a new Call.",
  input: CallsAddInput,
  output: CallsAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/calls.add", data) as any
  },
})
