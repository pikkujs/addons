// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MachinesSuspendInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
})

export const machinesSuspend = pikkuSessionlessFunc({
  description: "Suspend a specific Machine within an app. The next start operation will attempt (but is not guaranteed) to resume the Machine from a snapshot taken at suspension time, rather than performing a cold boot.",
  input: MachinesSuspendInput,
  output: z.void(),
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/suspend', data)
  },
})
