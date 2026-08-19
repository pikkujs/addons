// Project types — This resource represents project types. Use it to obtain a list of all project types, a list of project types accessible to the calling user, and details of a project type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const GetAllAccessibleProjectTypesOutput = z.array(z.object({
  color: z.string().optional().describe("The color of the project type."),
  descriptionI18nKey: z.string().optional().describe("The key of the project type's description."),
  formattedKey: z.string().optional().describe("The formatted key of the project type."),
  icon: z.string().optional().describe("The icon of the project type."),
  key: z.string().optional().describe("The key of the project type."),
}))

export const getAllAccessibleProjectTypes = pikkuSessionlessFunc({
  description: "Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license.",
  output: GetAllAccessibleProjectTypesOutput,
  func: async ({ jira }) => {
    return jira.call("GET", "/rest/api/3/project/type/accessible") as any
  },
})
