// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateIssueTypeSchemeInput = z.object({
  issueTypeSchemeId: z.number().int().describe("The ID of the issue type scheme."),
  defaultIssueTypeId: z.string().optional().describe("The ID of the default issue type of the issue type scheme."),
  description: z.string().optional().describe("The description of the issue type scheme. The maximum length is 4000 characters."),
  name: z.string().optional().describe("The name of the issue type scheme. The name must be unique. The maximum length is 255 characters."),
})

export const UpdateIssueTypeSchemeOutput = z.unknown()

export const updateIssueTypeScheme = pikkuSessionlessFunc({
  description: "Updates an issue type scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: UpdateIssueTypeSchemeInput,
  output: UpdateIssueTypeSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescheme/{issueTypeSchemeId}", data) as any
  },
})
