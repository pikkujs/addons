import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const SecretsUpdateInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  values: z.record(z.string(), z.string()).optional(),
})

export const SecretsUpdateOutput = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  secrets: z.array(z.object({
    created_at: z.string().optional(),
    digest: z.string().optional(),
    name: z.string().optional(),
    updated_at: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  version: z.number().int().optional(),
})

export const secretsUpdate = pikkuSessionlessFunc({
  input: SecretsUpdateInput,
  output: SecretsUpdateOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/secrets', data) as any
  },
})
