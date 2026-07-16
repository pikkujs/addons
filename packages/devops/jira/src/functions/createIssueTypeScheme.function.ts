// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, ConflictError } from '@pikku/core/errors'

export const CreateIssueTypeSchemeInput = z.object({
  defaultIssueTypeId: z.string().optional().describe("The ID of the default issue type of the issue type scheme. This ID must be included in `issueTypeIds`."),
  description: z.string().optional().describe("The description of the issue type scheme. The maximum length is 4000 characters."),
  issueTypeIds: z.array(z.string()).describe("The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required."),
  name: z.string().describe("The name of the issue type scheme. The name must be unique. The maximum length is 255 characters."),
})

export const CreateIssueTypeSchemeOutput = z.object({
  issueTypeSchemeId: z.string().describe("The ID of the issue type scheme."),
}).describe("The ID of an issue type scheme.")

export const createIssueTypeScheme = pikkuSessionlessFunc({
  description: "Creates an issue type scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: CreateIssueTypeSchemeInput,
  output: CreateIssueTypeSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/issuetypescheme", data) as any
  },
})
