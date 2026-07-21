// Project avatars — This resource represents avatars associated with a project. Use it to get, load, set, and remove project avatars.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteProjectAvatarInput = z.object({
  projectIdOrKey: z.string().describe("The project ID or (case-sensitive) key."),
  id: z.number().int().describe("The ID of the avatar."),
})

export const deleteProjectAvatar = pikkuSessionlessFunc({
  description: "Deletes a custom avatar from a project. Note that system avatars cannot be deleted.\n\n**[Permissions](#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg).",
  input: DeleteProjectAvatarInput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/project/{projectIdOrKey}/avatar/{id}", data)
  },
})
