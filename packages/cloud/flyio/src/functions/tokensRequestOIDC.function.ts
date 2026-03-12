import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const TokensRequestOIDCInput = z.object({
  aud: z.string().optional(),
  aws_principal_tags: z.boolean().optional(),
})

export const TokensRequestOIDCOutput = z.string()

export const tokensRequestOIDC = pikkuSessionlessFunc({
  description: "Request an Open ID Connect token for your machine. Customize the audience claim with the `aud` parameter. This returns a JWT token. Learn more about [using OpenID Connect](/docs/reference/openid-connect/) on Fly.io.",
  input: TokensRequestOIDCInput,
  output: TokensRequestOIDCOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/tokens/oidc', data) as any
  },
})
