// Issue field configurations — This resource represents issue field configurations. Use it to get, set, and delete field configurations and field configuration schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignFieldConfigurationSchemeToProjectInput = z.object({
  fieldConfigurationSchemeId: z.string().optional().describe("The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme."),
  projectId: z.string().describe("The ID of the project."),
})

export const AssignFieldConfigurationSchemeToProjectOutput = z.unknown()

export const assignFieldConfigurationSchemeToProject = pikkuSessionlessFunc({
  description: "Assigns a field configuration scheme to a project. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme.\n\nField configuration schemes can only be assigned to classic projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AssignFieldConfigurationSchemeToProjectInput,
  output: AssignFieldConfigurationSchemeToProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/fieldconfigurationscheme/project", data) as any
  },
})
