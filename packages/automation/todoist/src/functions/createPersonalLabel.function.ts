import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreatePersonalLabelInput = z.object({
  name: z.string().describe("Name of the label."),
  order: z.number().int().optional().describe("Label order."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
})

export const CreatePersonalLabelOutput = z.object({
  id: z.string().optional().describe("Label ID."),
  name: z.string().optional().describe("Label name."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  order: z.number().int().optional().describe("Number used by clients to sort list of labels."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
})

export const createPersonalLabel = pikkuSessionlessFunc({
  description: "Creates a new personal label and returns its object as JSON.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: CreatePersonalLabelInput,
  output: CreatePersonalLabelOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/labels", data) as any
  },
})
