// Issue type screen schemes — This resource represents issue type screen schemes. Use it to: * get issue type screen schemes and a list of the projects that use them. * create issue type screen schemes. * update issue type screen schemes. * delete issue type screen schemes. * associate issue type screen schemes with projects. * append issue type to screen scheme mappings to issue type screen schemes. * remove issue type to screen scheme mappings from issue type screen schemes. * update default screen scheme of issue type screen scheme.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AssignIssueTypeScreenSchemeToProjectInput = z.object({
  issueTypeScreenSchemeId: z.string().optional().describe("The ID of the issue type screen scheme."),
  projectId: z.string().optional().describe("The ID of the project."),
})

export const AssignIssueTypeScreenSchemeToProjectOutput = z.unknown()

export const assignIssueTypeScreenSchemeToProject = pikkuSessionlessFunc({
  description: "Assigns an issue type screen scheme to a project.\n\nIssue type screen schemes can only be assigned to classic projects.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AssignIssueTypeScreenSchemeToProjectInput,
  output: AssignIssueTypeScreenSchemeToProjectOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescreenscheme/project", data) as any
  },
})
