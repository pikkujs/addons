import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretCreateInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("App secret name"),
  value: z.string().optional(),
})

export const SecretCreateOutput = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  created_at: z.string().optional(),
  digest: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  value: z.string().optional(),
  version: z.number().int().optional(),
})

export const secretCreate = pikkuSessionlessFunc({
  input: SecretCreateInput,
  output: SecretCreateOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secrets/{secret_name}', data) as any
  },
})
