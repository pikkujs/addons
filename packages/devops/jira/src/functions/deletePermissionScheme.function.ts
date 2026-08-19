// Permission schemes — This resource represents permission schemes. Use it to get, create, update, and delete permission schemes as well as get, create, update, and delete details of the permissions granted in those schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeletePermissionSchemeInput = z.object({
  schemeId: z.number().int().describe("The ID of the permission scheme being deleted."),
})

export const deletePermissionScheme = pikkuSessionlessFunc({
  description: "Deletes a permission scheme.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeletePermissionSchemeInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/permissionscheme/{schemeId}", data)
  },
})
