// Issue type schemes — This resource represents issue type schemes in classic projects. Use it to: * get issue type schemes and a list of the projects that use them. * associate issue type schemes with projects. * add issue types to issue type schemes. * delete issue types from issue type schemes. * create, update, and delete issue type schemes. * change the order of issue types in issue type schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const ReorderIssueTypesInIssueTypeSchemeInput = z.object({
  issueTypeSchemeId: z.number().int().describe("The ID of the issue type scheme."),
  after: z.string().optional().describe("The ID of the issue type to place the moved issue types after. Required if `position` isn't provided."),
  issueTypeIds: z.array(z.string()).describe("A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after the move."),
  position: z.enum(["First", "Last"]).optional().describe("The position the issue types should be moved to. Required if `after` isn't provided."),
})

export const ReorderIssueTypesInIssueTypeSchemeOutput = z.unknown()

export const reorderIssueTypesInIssueTypeScheme = pikkuSessionlessFunc({
  description: "Changes the order of issue types in an issue type scheme.\n\nThe request body parameters must meet the following requirements:\n\n *  all of the issue types must belong to the issue type scheme.\n *  either `after` or `position` must be provided.\n *  the issue type in `after` must not be in the issue type list.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: ReorderIssueTypesInIssueTypeSchemeInput,
  output: ReorderIssueTypesInIssueTypeSchemeOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/move", data) as any
  },
})
