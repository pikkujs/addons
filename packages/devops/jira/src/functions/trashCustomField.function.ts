// Issue fields — This resource represents issue fields, both system and custom fields. Use it to get fields, field configurations, and create custom fields.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const TrashCustomFieldInput = z.object({
  id: z.string().describe("The ID of a custom field."),
})

export const TrashCustomFieldOutput = z.unknown()

export const trashCustomField = pikkuSessionlessFunc({
  description: "Moves a custom field to trash. See [Edit or delete a custom field](https://confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: TrashCustomFieldInput,
  output: TrashCustomFieldOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/field/{id}/trash", data) as any
  },
})
