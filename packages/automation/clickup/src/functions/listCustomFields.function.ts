import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListCustomFieldsInput = z.object({
  listId: z.string(),
})

export const ListCustomFieldsOutput = z.record(z.string(), z.unknown())

export const listCustomFields = pikkuSessionlessFunc({
  description: "List custom fields",
  input: ListCustomFieldsInput,
  output: ListCustomFieldsOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/list/{listId}/field", data) as any
  },
})
