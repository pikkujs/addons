// Avatars — This resource represents system and custom avatars. Use it to obtain the details of system or custom avatars, add and remove avatars from a project or issue type, and obtain avatar images.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const GetAvatarImageByIDInput = z.object({
  type: z.enum(["issuetype", "project"]).describe("The icon type of the avatar."),
  id: z.number().int().describe("The ID of the avatar."),
  size: z.enum(["xsmall", "small", "medium", "large", "xlarge"]).optional().describe("The size of the avatar image. If not provided the default size is returned."),
  format: z.enum(["png", "svg"]).optional().describe("The format to return the avatar image in. If not provided the original content format is returned."),
})

export const GetAvatarImageByIDOutput = z.record(z.string(), z.unknown())

export const getAvatarImageByID = pikkuSessionlessFunc({
  description: "Returns a project or issue type avatar image by ID.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  For system avatars, none.\n *  For custom project avatars, *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project the avatar belongs to.\n *  For custom issue type avatars, *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one project the issue type is used in.",
  input: GetAvatarImageByIDInput,
  output: GetAvatarImageByIDOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/universal_avatar/view/type/{type}/avatar/{id}", data) as any
  },
})
