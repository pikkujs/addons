import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretsListInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  show_secrets: z.boolean().optional().describe("Show the secret values."),
})

export const SecretsListOutput = z.object({
  secrets: z.array(z.object({
    created_at: z.string().optional(),
    digest: z.string().optional(),
    name: z.string().optional(),
    updated_at: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
})

export const secretsList = pikkuSessionlessFunc({
  input: SecretsListInput,
  output: SecretsListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/secrets', data) as any
  },
})
