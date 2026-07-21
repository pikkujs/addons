import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeletePersonalLabelInput = z.object({
  label_id: z.number().int().describe("The ID of the label to delete."),
})

export const deletePersonalLabel = pikkuSessionlessFunc({
  description: "Deletes a personal label, all instances of the label will be removed from tasks.\n\nA successful response has 204 No Content status and an empty body.",
  input: DeletePersonalLabelInput,
  func: async ({ todoist }, data) => {
    return todoist.call("DELETE", "/labels/{label_id}", data)
  },
})
