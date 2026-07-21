import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallsParticipantsRemoveInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `calls:write`"),
  id: z.string().describe("`id` returned by the [`calls.add`](/methods/calls.add) method."),
  users: z.string().describe("The list of users to remove as participants in the Call. [Read more on how to specify users here](/apis/calls#users)."),
})

export const CallsParticipantsRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsParticipantsRemove = pikkuSessionlessFunc({
  description: "Registers participants removed from a Call.",
  input: CallsParticipantsRemoveInput,
  output: CallsParticipantsRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/calls.participants.remove", data) as any
  },
})
