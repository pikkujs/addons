// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const AddIssueTypesToIssueTypeSchemeInput = z.object({
  issueTypeSchemeId: z.number().int().describe("The ID of the issue type scheme."),
  issueTypeIds: z.array(z.string()).describe("The list of issue type IDs."),
})

export const AddIssueTypesToIssueTypeSchemeOutput = z.unknown()

export const addIssueTypesToIssueTypeScheme = pikkuSessionlessFunc({
  description: "Adds issue types to an issue type scheme.\n\nThe added issue types are appended to the issue types list.\n\nIf any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: AddIssueTypesToIssueTypeSchemeInput,
  output: AddIssueTypesToIssueTypeSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype", data) as any
  },
})
