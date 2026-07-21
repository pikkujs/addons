import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ContainerAddTaskInput = z.object({
  containerId: z.string(),
  tasks: z.array(z.string()).optional(),
})

export const ContainerAddTaskOutput = z.record(z.string(), z.unknown())

export const containerAddTask = pikkuSessionlessFunc({
  description: "Add tasks to a container",
  input: ContainerAddTaskInput,
  output: ContainerAddTaskOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/containers/{containerId}/tasks", data) as any
  },
})
