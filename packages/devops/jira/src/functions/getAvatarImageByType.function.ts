// Avatars — This resource represents system and custom avatars. Use it to obtain the details of system or custom avatars, add and remove avatars from a project or issue type, and obtain avatar images.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAvatarImageByTypeInput = z.object({
  type: z.enum(["issuetype", "project"]).describe("The icon type of the avatar."),
  size: z.enum(["xsmall", "small", "medium", "large", "xlarge"]).optional().describe("The size of the avatar image. If not provided the default size is returned."),
  format: z.enum(["png", "svg"]).optional().describe("The format to return the avatar image in. If not provided the original content format is returned."),
})

export const GetAvatarImageByTypeOutput = z.record(z.string(), z.unknown())

export const getAvatarImageByType = pikkuSessionlessFunc({
  description: "Returns the default project or issue type avatar image.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetAvatarImageByTypeInput,
  output: GetAvatarImageByTypeOutput,
  errors: [UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/universal_avatar/view/type/{type}", data) as any
  },
})
