import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TokensRequestKmsOutput = z.string()

export const tokensRequestKms = pikkuSessionlessFunc({
  description: "This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.",
  output: TokensRequestKmsOutput,
  func: async ({ flyio }) => {
    return flyio.call('POST', '/tokens/kms') as any
  },
})
