// Workflow scheme project associations — This resource represents the associations between workflow schemes and projects. For more information, see [Managing your workflows](https://confluence.atlassian.com/x/q4hKLg).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignSchemeToProjectInput = z.object({
  projectId: z.string().describe("The ID of the project."),
  workflowSchemeId: z.string().optional().describe("The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow scheme."),
})

export const AssignSchemeToProjectOutput = z.unknown()

export const assignSchemeToProject = pikkuSessionlessFunc({
  description: "Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.\n\nWorkflow schemes can only be assigned to classic projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AssignSchemeToProjectInput,
  output: AssignSchemeToProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/workflowscheme/project", data) as any
  },
})
