// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppCreateDeployTokenInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  expiry: z.string().optional(),
})

export const AppCreateDeployTokenOutput = z.object({
  token: z.string().optional(),
})

export const appCreateDeployToken = pikkuSessionlessFunc({
  input: AppCreateDeployTokenInput,
  output: AppCreateDeployTokenOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/deploy_token', data) as any
  },
})
