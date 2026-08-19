import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetAllCollaboratorsInput = z.object({
  projectId: z.string().describe("Project ID."),
})

export const GetAllCollaboratorsOutput = z.array(z.object({
  id: z.string().optional().describe("Collaborator's user ID"),
  name: z.string().optional().describe("Collaborator's name"),
  email: z.string().optional().describe("Collaborator's email"),
}))

export const getAllCollaborators = pikkuSessionlessFunc({
  description: "Returns JSON-encoded array containing all collaborators of a shared project.\n\nA successful response has 200 OK status and application/json Content-Type.",
  input: GetAllCollaboratorsInput,
  output: GetAllCollaboratorsOutput,
  func: async ({ todoist }, data) => {
    return todoist.call("GET", "/projects/{projectId}/collaborators", data) as any
  },
})
