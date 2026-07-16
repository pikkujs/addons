import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetPersonalLabelInput = z.object({
  label_id: z.number().int().describe("The ID of the label to retrieve."),
})

export const GetPersonalLabelOutput = z.object({
  id: z.string().optional().describe("Label ID."),
  name: z.string().optional().describe("Label name."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  order: z.number().int().optional().describe("Number used by clients to sort list of labels."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
})

export const getPersonalLabel = pikkuSessionlessFunc({
  description: "Returns a personal label by ID.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetPersonalLabelInput,
  output: GetPersonalLabelOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/labels/{label_id}", data) as any
  },
})
