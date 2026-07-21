// Screen schemes — This resource represents screen schemes in classic projects. Use it to get, create, update, and delete screen schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteScreenSchemeInput = z.object({
  screenSchemeId: z.string().describe("The ID of the screen scheme."),
})

export const deleteScreenScheme = pikkuSessionlessFunc({
  description: "Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.\n\nOnly screens schemes used in classic projects can be deleted.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteScreenSchemeInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/screenscheme/{screenSchemeId}", data)
  },
})
