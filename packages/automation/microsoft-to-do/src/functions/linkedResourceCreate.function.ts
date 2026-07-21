import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LinkedResourceCreateInput = z.object({
  taskListId: z.string(),
  taskId: z.string(),
  applicationName: z.string().optional(),
  displayName: z.string().optional(),
})

export const LinkedResourceCreateOutput = z.record(z.string(), z.unknown())

export const linkedResourceCreate = pikkuSessionlessFunc({
  description: "Create a linked resource",
  input: LinkedResourceCreateInput,
  output: LinkedResourceCreateOutput,
  func: async ({ microsoftToDo }, data) => {
    return microsoftToDo.call("POST", "/todo/lists/{taskListId}/tasks/{taskId}/linkedResources", data) as any
  },
})
