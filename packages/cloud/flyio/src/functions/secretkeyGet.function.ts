import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SecretkeyGetInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  secret_name: z.string().describe("Secret key name"),
  min_version: z.string().optional().describe("Minimum secrets version to return. Returned when setting a new secret"),
})

export const SecretkeyGetOutput = z.object({
  created_at: z.string().optional(),
  name: z.string().optional(),
  public_key: z.array(z.number().int()).optional(),
  type: z.string().optional(),
  updated_at: z.string().optional(),
})

export const secretkeyGet = pikkuSessionlessFunc({
  input: SecretkeyGetInput,
  output: SecretkeyGetOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/secretkeys/{secret_name}', data) as any
  },
})
