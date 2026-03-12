import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretDeleteInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("App secret name"),
})

export const SecretDeleteOutput = z.object({
  Version: z.number().int().optional().describe("DEPRECATED"),
  version: z.number().int().optional(),
})

export const secretDelete = pikkuSessionlessFunc({
  input: SecretDeleteInput,
  output: SecretDeleteOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('DELETE', '/apps/{app_name}/secrets/{secret_name}', data) as any
  },
})
