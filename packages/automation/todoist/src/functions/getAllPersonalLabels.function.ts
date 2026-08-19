import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetAllPersonalLabelsOutput = z.array(z.object({
  id: z.string().optional().describe("Label ID."),
  name: z.string().optional().describe("Label name."),
  color: z.string().optional().describe("The color of the label icon. Refer to the name column in the Colors guide for more info."),
  order: z.number().int().optional().describe("Number used by clients to sort list of labels."),
  is_favorite: z.boolean().optional().describe("Whether the label is a favorite (a true or false value)."),
}))

export const getAllPersonalLabels = pikkuSessionlessFunc({
  description: "Returns a JSON-encoded array containing all user labels.\n\nA successful response has 200 OK status and application/json Content-Type.",
  output: GetAllPersonalLabelsOutput,
  func: async ({ todoist }) => {
    return todoist.call("GET", "/labels") as any
  },
})
