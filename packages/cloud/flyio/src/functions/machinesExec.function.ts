// Machines — This site hosts documentation generated from the Fly.io Machines API OpenAPI specification. Visit our complete [Machines API docs](https://fly.io/docs/machines/api/machines-resource/) for details about using the Machines resource.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const MachinesExecInput = z.object({
  app_name: z.string().describe("Fly App Name"),
  machine_id: z.string().describe("Machine ID"),
  cmd: z.string().optional().describe("Deprecated: use Command instead").describe("Deprecated: use Command instead"),
  command: z.array(z.string()).optional(),
  container: z.string().optional(),
  stdin: z.string().optional(),
  timeout: z.number().int().optional(),
})

export const MachinesExecOutput = z.object({
  exit_code: z.number().int().optional(),
  exit_signal: z.number().int().optional(),
  stderr: z.string().optional(),
  stdout: z.string().optional(),
})

export const machinesExec = pikkuSessionlessFunc({
  description: "Execute a command on a specific Machine and return the raw command output bytes.",
  input: MachinesExecInput,
  output: MachinesExecOutput,
  errors: [BadRequestError],
  func: async ({ flyio }, data) => {
    return flyio.call('POST', '/apps/{app_name}/machines/{machine_id}/exec', data) as any
  },
})
