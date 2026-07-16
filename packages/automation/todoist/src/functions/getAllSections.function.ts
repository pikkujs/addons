import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GetAllSectionsInput = z.object({
  project_id: z.string().optional().describe("Project ID."),
})

export const GetAllSectionsOutput = z.array(z.object({
  id: z.string().optional().describe("Section ID"),
  project_id: z.string().optional().describe("ID of the project section belongs to"),
  order: z.number().int().optional().describe("Section position among other sections from the same project"),
  name: z.string().optional().describe("Section name"),
}))

export const getAllSections = pikkuSessionlessFunc({
  description: "Returns a JSON array of all sections.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetAllSectionsInput,
  output: GetAllSectionsOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/sections", data) as any
  },
})
