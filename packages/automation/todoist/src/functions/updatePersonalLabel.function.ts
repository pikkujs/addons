import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UpdatePersonalLabelInput = z.object({
  label_id: z.string().describe("The ID of the label to update."),
  name: z.string().optional().describe("New name of the label."),
  order: z.number().int().optional().describe("Number that is used by clients to sort the list of labels."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
})

export const UpdatePersonalLabelOutput = z.object({
  id: z.string().optional().describe("Label ID."),
  name: z.string().optional().describe("Label name."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  order: z.number().int().optional().describe("Number used by clients to sort list of labels."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
})

export const updatePersonalLabel = pikkuSessionlessFunc({
  description: "Returns the updated label.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: UpdatePersonalLabelInput,
  output: UpdatePersonalLabelOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/labels/{label_id}", data) as any
  },
})
