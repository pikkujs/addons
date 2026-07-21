import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LinkedResourceGetInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  linkedResourceId: z.string(),
})

export const LinkedResourceGetOutput = z.record(z.string(), z.unknown())

export const linkedResourceGet = pikkuSessionlessFunc({
  description: "Get a linked resource",
  input: LinkedResourceGetInput,
  output: LinkedResourceGetOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("GET", "/todo/lists/{taskListId}/tasks/{taskId}/linkedResources/{linkedResourceId}", data) as any
  },
})
