// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesRestartInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  timeout: z.string().optional().describe("Restart timeout as a Go duration string or number of seconds"),
  signal: z.string().optional().describe("Unix signal name"),
})

export const machinesRestart = pikkuSessionlessFunc({
  description: "Restart a specific Machine within an app, with an optional timeout parameter.",
  input: MachinesRestartInput,
  output: z.void(),
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/restart', data)
  },
})
