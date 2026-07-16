// Project avatars — This resource represents avatars associated with a project. Use it to get, load, set, and remove project avatars.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const UpdateProjectAvatarInput = z.object({
  projectIdOrKey: z.string().describe("The ID or (case-sensitive) key of the project."),
  id: z.string().describe("The ID of the avatar."),
})

export const UpdateProjectAvatarOutput = z.unknown()

export const updateProjectAvatar = pikkuSessionlessFunc({
  description: "Sets the avatar displayed for a project.\n\nUse [Load project avatar](#api-rest-api-3-project-projectIdOrKey-avatar2-post) to store avatars against the project, before using this operation to set the displayed avatar.\n\n**[Permissions](#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg).",
  input: UpdateProjectAvatarInput,
  output: UpdateProjectAvatarOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/project/{projectIdOrKey}/avatar", data) as any
  },
})
