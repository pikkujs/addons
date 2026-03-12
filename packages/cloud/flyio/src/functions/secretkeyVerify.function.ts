import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretkeyVerifyInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  plaintext: z.array(z.number().int()).optional(),
  signature: z.array(z.number().int()).optional(),
})

export const secretkeyVerify = pikkuSessionlessFunc({
  input: SecretkeyVerifyInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secretkeys/{secret_name}/verify', data)
  },
})
