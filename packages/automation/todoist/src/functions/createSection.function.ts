import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateSectionInput = z.object({
  project_id: z.string().describe("Project ID this section should belong to"),
  name: z.string().describe("Section name"),
  order: z.number().int().optional().describe("Order among other sections in a project"),
})

export const CreateSectionOutput = z.object({
  id: z.string().optional().describe("Section ID"),
  project_id: z.string().optional().describe("ID of the project section belongs to"),
  order: z.number().int().optional().describe("Section position among other sections from the same project"),
  name: z.string().optional().describe("Section name"),
})

export const createSection = pikkuSessionlessFunc({
  description: "Creates a new section and returns it as a JSON object.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: CreateSectionInput,
  output: CreateSectionOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("POST", "/sections", data) as any
  },
})
