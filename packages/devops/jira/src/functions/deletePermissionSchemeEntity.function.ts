// Permission schemes — This resource represents permission schemes. Use it to get, create, update, and delete permission schemes as well as get, create, update, and delete details of the permissions granted in those schemes.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError } from '@pikku/core/errors'

export const DeletePermissionSchemeEntityInput = z.object({
  schemeId: z.number().int().describe("The ID of the permission scheme to delete the permission grant from."),
  permissionId: z.number().int().describe("The ID of the permission grant to delete."),
})

export const deletePermissionSchemeEntity = pikkuSessionlessFunc({
  description: "Deletes a permission grant from a permission scheme. See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeletePermissionSchemeEntityInput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}", data)
  },
})
