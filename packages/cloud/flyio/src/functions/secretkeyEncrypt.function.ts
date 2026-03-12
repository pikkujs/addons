import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretkeyEncryptInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  associated_data: z.array(z.number().int()).optional(),
  plaintext: z.array(z.number().int()).optional(),
})

export const SecretkeyEncryptOutput = z.object({
  ciphertext: z.array(z.number().int()).optional(),
})

export const secretkeyEncrypt = pikkuSessionlessFunc({
  input: SecretkeyEncryptInput,
  output: SecretkeyEncryptOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secretkeys/{secret_name}/encrypt', data) as any
  },
})
