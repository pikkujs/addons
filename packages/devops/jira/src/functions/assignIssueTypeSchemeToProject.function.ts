// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignIssueTypeSchemeToProjectInput = z.object({
  issueTypeSchemeId: z.string().describe("The ID of the issue type scheme."),
  projectId: z.string().describe("The ID of the project."),
})

export const AssignIssueTypeSchemeToProjectOutput = z.unknown()

export const assignIssueTypeSchemeToProject = pikkuSessionlessFunc({
  description: "Assigns an issue type scheme to a project.\n\nIf any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To complete the assignment those issues must be updated to use issue types in the new scheme.\n\nIssue type schemes can only be assigned to classic projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AssignIssueTypeSchemeToProjectInput,
  output: AssignIssueTypeSchemeToProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescheme/project", data) as any
  },
})
