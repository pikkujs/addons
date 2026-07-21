import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskSetCustomFieldInput = z.object({
  taskId: z.string(),
  fieldId: z.string(),
  value: z.string().optional(),
})

export const TaskSetCustomFieldOutput = z.record(z.string(), z.unknown())

export const taskSetCustomField = pikkuSessionlessFunc({
  description: "Task set custom field",
  input: TaskSetCustomFieldInput,
  output: TaskSetCustomFieldOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/task/{taskId}/field/{fieldId}", data) as any
  },
})
