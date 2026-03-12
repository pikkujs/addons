import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, InternalServerError } from '@pikku/core/errors'

export const CurrentTokenShowOutput = z.object({
  tokens: z.array(z.object({
    apps: z.array(z.string()).optional(),
    org_slug: z.string().optional(),
    organization: z.string().optional(),
    restricted_to_machine: z.string().optional().describe("Machine the token is restricted to (FromMachine caveat)"),
    source_machine_id: z.string().optional().describe("Machine making the request"),
    token_id: z.string().optional(),
    user: z.string().optional().describe("User identifier if token is for a user"),
  })).optional(),
})

export const currentTokenShow = pikkuSessionlessFunc({
  description: "Get information about the current macaroon token(s), including organizations, apps, and whether each token is from a user or machine",
  output: CurrentTokenShowOutput,
  errors: [UnauthorizedError, InternalServerError],
  func: async ({ flyio }) => {
    return flyio.call('GET', '/v1/tokens/current') as any
  },
})
