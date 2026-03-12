// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesWaitInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  instance_id: z.string().optional().describe("26-character Machine version ID"),
  timeout: z.number().int().optional().describe("wait timeout. default 60s"),
  state: z.enum(["started", "stopped", "suspended", "destroyed", "settled"]).optional().describe("desired state"),
})

export const MachinesWaitOutput = z.object({
  ok: z.boolean().optional(),
  state: z.string().optional(),
})

export const machinesWait = pikkuSessionlessFunc({
  description: "Wait for a Machine to reach a specific state. Specify the desired state with the state parameter. See the [Machine states table](https://fly.io/docs/machines/working-with-machines/#machine-states) for a list of possible states. The default for this parameter is `started`.\n\nThis request will block for up to 60 seconds. Set a shorter timeout with the timeout parameter.",
  input: MachinesWaitInput,
  output: MachinesWaitOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('GET', '/apps/{app_name}/machines/{machine_id}/wait', data) as any
  },
})
