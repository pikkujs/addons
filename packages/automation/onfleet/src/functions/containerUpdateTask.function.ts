import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ContainerUpdateTaskInput = z.object({
  containerId: z.string(),
  tasks: z.array(z.string()).optional(),
})

export const ContainerUpdateTaskOutput = z.record(z.string(), z.unknown())

export const containerUpdateTask = pikkuSessionlessFunc({
  description: "Update tasks on a container",
  input: ContainerUpdateTaskInput,
  output: ContainerUpdateTaskOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/containers/{containerId}/tasks/update", data) as any
  },
})
