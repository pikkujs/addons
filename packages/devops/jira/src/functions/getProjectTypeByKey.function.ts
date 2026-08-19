// Project types — This resource represents project types. Use it to obtain a list of all project types, a list of project types accessible to the calling user, and details of a project type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetProjectTypeByKeyInput = z.object({
  projectTypeKey: z.enum(["software", "service_desk", "business", "product_discovery"]).describe("The key of the project type."),
})

export const GetProjectTypeByKeyOutput = z.object({
  color: z.string().optional().describe("The color of the project type."),
  descriptionI18nKey: z.string().optional().describe("The key of the project type's description."),
  formattedKey: z.string().optional().describe("The formatted key of the project type."),
  icon: z.string().optional().describe("The icon of the project type."),
  key: z.string().optional().describe("The key of the project type."),
}).describe("Details about a project type.")

export const getProjectTypeByKey = pikkuSessionlessFunc({
  description: "Returns a [project type](https://confluence.atlassian.com/x/Var1Nw).\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetProjectTypeByKeyInput,
  output: GetProjectTypeByKeyOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/type/{projectTypeKey}", data) as any
  },
})
