// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueTypeSchemeInput = z.object({
  issueTypeSchemeId: z.number().int().describe("The ID of the issue type scheme."),
})

export const DeleteIssueTypeSchemeOutput = z.unknown()

export const deleteIssueTypeScheme = pikkuSessionlessFunc({
  description: "Deletes an issue type scheme.\n\nOnly issue type schemes used in classic projects can be deleted.\n\nAny projects assigned to the scheme are reassigned to the default issue type scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteIssueTypeSchemeInput,
  output: DeleteIssueTypeSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issuetypescheme/{issueTypeSchemeId}", data) as any
  },
})
