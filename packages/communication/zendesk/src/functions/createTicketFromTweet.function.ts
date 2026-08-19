import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateTicketFromTweetOutput = z.string().describe("Empty response")

export const createTicketFromTweet = pikkuSessionlessFunc({
  description: "Turns a tweet into a ticket. You must provide the tweet id as well as the id of a monitored X (formerly Twitter) handle configured for your account.\n\nThe submitter of the ticket is set to be the user submitting the API request.\n\n#### Allowed For\n\n* Agents",
  output: CreateTicketFromTweetOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/channels/twitter/tickets") as any
  },
})
