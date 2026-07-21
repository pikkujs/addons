import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateTrialAccountOutput = z.object({
  account: z.object({
    name: z.string().optional().describe("The name of the account"),
    subdomain: z.string().optional().describe("The subdomain of the account"),
    url: z.string().optional().describe("The URL of the account"),
  }).optional(),
})

export const createTrialAccount = pikkuSessionlessFunc({
  output: CreateTrialAccountOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/accounts") as any
  },
})
