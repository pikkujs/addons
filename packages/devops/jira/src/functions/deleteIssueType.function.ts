// Issue types — This resource represents issues types. Use it to: * get, create, update, and delete issue types. * get all issue types for a user. * get alternative issue types. * set an avatar for an issue type.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError } from '@pikku/core/errors'

export const DeleteIssueTypeInput = z.object({
  id: z.string().describe("The ID of the issue type."),
  alternativeIssueTypeId: z.string().optional().describe("The ID of the replacement issue type."),
})

export const deleteIssueType = pikkuSessionlessFunc({
  description: "Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue types](#api-rest-api-3-issuetype-id-alternatives-get) resource.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteIssueTypeInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issuetype/{id}", data)
  },
})
