import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskMemberInput = z.object({
  taskId: z.string(),
})

export const TaskMemberOutput = z.record(z.string(), z.unknown())

export const taskMember = pikkuSessionlessFunc({
  description: "Task member",
  input: TaskMemberInput,
  output: TaskMemberOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/task/{taskId}/member", data) as any
  },
})
