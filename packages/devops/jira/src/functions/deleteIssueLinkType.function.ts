// Issue link types — This resource represents [issue link](#api-group-Issue-links) types. Use it to get, create, update, and delete link issue types as well as get lists of all link issue types. To use it, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const DeleteIssueLinkTypeInput = z.object({
  issueLinkTypeId: z.string().describe("The ID of the issue link type."),
})

export const deleteIssueLinkType = pikkuSessionlessFunc({
  description: "Deletes an issue link type.\n\nTo use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteIssueLinkTypeInput,
  errors: [BadRequestError, UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/issueLinkType/{issueLinkTypeId}", data)
  },
})
