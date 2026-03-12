import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretGetInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("App secret name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
  show_secrets: z.boolean().optional().describe("Show the secret value."),
})

export const SecretGetOutput = z.object({
  created_at: z.string().optional(),
  digest: z.string().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  value: z.string().optional(),
})

export const secretGet = pikkuSessionlessFunc({
  input: SecretGetInput,
  output: SecretGetOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/secrets/{secret_name}', data) as any
  },
})
