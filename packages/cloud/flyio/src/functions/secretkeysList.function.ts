import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretkeysListInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  types: z.string().optional().describe("Comma-seperated list of secret keys to list"),
})

export const SecretkeysListOutput = z.object({
  secret_keys: z.array(z.object({
    created_at: z.string().optional(),
    name: z.string().optional(),
    public_key: z.array(z.number().int()).optional(),
    type: z.string().optional(),
    updated_at: z.string().optional(),
  })).optional(),
})

export const secretkeysList = pikkuSessionlessFunc({
  input: SecretkeysListInput,
  output: SecretkeysListOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/secretkeys', data) as any
  },
})
