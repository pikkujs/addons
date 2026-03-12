// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesStopInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  signal: z.string().optional(),
  timeout: z.object({
  "time.Duration": z.number().int().optional(),
}).optional(),
})

export const machinesStop = pikkuSessionlessFunc({
  description: "Stop a specific Machine within an app, with an optional request body to specify signal and timeout.",
  input: MachinesStopInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/stop', data)
  },
})
