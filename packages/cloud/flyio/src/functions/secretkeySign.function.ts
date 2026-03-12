import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretkeySignInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  plaintext: z.array(z.number().int()).optional(),
})

export const SecretkeySignOutput = z.object({
  signature: z.array(z.number().int()).optional(),
})

export const secretkeySign = pikkuSessionlessFunc({
  input: SecretkeySignInput,
  output: SecretkeySignOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secretkeys/{secret_name}/sign', data) as any
  },
})
