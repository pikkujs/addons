// Avatars — This resource represents system and custom avatars. Use it to obtain the details of system or custom avatars, add and remove avatars from a project or issue type, and obtain avatar images.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const DeleteAvatarInput = z.object({
  type: z.enum(["project", "issuetype"]).describe("The avatar type."),
  owningObjectId: z.string().describe("The ID of the item the avatar is associated with."),
  id: z.number().int().describe("The ID of the avatar."),
})

export const deleteAvatar = pikkuSessionlessFunc({
  description: "Deletes an avatar from a project or issue type.\n\n**[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
  input: DeleteAvatarInput,
  errors: [BadRequestError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{id}", data)
  },
})
