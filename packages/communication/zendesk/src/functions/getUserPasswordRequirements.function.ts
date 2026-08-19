import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetUserPasswordRequirementsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const GetUserPasswordRequirementsOutput = z.object({
  requirements: z.array(z.string()).optional(),
})

export const getUserPasswordRequirements = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents\n* End Users",
  input: GetUserPasswordRequirementsInput,
  output: GetUserPasswordRequirementsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/password/requirements", data) as any
  },
})
