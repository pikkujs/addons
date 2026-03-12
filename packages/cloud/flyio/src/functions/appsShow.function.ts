// Apps — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/apps-resource/) for details about using the Apps resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AppsShowInput = z.object({
  app_name: z.string().describe("Fly App Name"),
})

export const AppsShowOutput = z.object({
  id: z.string().optional(),
  internal_numeric_id: z.number().int().optional(),
  machine_count: z.number().int().optional(),
  name: z.string().optional(),
  network: z.string().optional(),
  organization: z.object({
    internal_numeric_id: z.number().int().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
  }).optional(),
  status: z.string().optional(),
  volume_count: z.number().int().optional(),
})

export const appsShow = pikkuSessionlessFunc({
  description: "Retrieve details about a specific app by its name.",
  input: AppsShowInput,
  output: AppsShowOutput,
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}', data) as any
  },
})
