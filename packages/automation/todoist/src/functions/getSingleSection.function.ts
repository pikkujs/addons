import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetSingleSectionInput = z.object({
  sectionId: z.string().describe("Section ID."),
})

export const GetSingleSectionOutput = z.object({
  id: z.string().optional().describe("Section ID"),
  project_id: z.string().optional().describe("ID of the project section belongs to"),
  order: z.number().int().optional().describe("Section position among other sections from the same project"),
  name: z.string().optional().describe("Section name"),
})

export const getSingleSection = pikkuSessionlessFunc({
  description: "Returns a single section as a JSON object.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetSingleSectionInput,
  output: GetSingleSectionOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/sections/{sectionId}", data) as any
  },
})
