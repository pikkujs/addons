import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallsParticipantsAddInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `calls:write`"),
  id: z.string().describe("`id` returned by the [`calls.add`](/methods/calls.add) method."),
  users: z.string().describe("The list of users to add as participants in the Call. [Read more on how to specify users here](/apis/calls#users)."),
})

export const CallsParticipantsAddOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const callsParticipantsAdd = pikkuSessionlessFunc({
  description: "Registers new participants added to a Call.",
  input: CallsParticipantsAddInput,
  output: CallsParticipantsAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/calls.participants.add", data) as any
  },
})
