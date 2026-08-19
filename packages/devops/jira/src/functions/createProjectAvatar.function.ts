// Project avatars — This resource represents avatars associated with a project. Use it to get, load, set, and remove project avatars.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from '@pikku/core/errors'

export const CreateProjectAvatarInput = z.object({
  projectIdOrKey: z.string().describe("The ID or (case-sensitive) key of the project."),
  x: z.number().int().optional().default(0).describe("The X coordinate of the top-left corner of the crop region."),
  y: z.number().int().optional().default(0).describe("The Y coordinate of the top-left corner of the crop region."),
  size: z.number().int().optional().describe("The length of each side of the crop region."),
  body: z.unknown(),
})

export const CreateProjectAvatarOutput = z.object({
  fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
  id: z.string().describe("The ID of the avatar."),
  isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
  isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
  isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
  owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
  urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
}).describe("Details of an avatar.")

export const createProjectAvatar = pikkuSessionlessFunc({
  description: "Loads an avatar for a project.\n\nSpecify the avatar's local file location in the body of the request. Also, include the following headers:\n\n *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special Headers](#special-request-headers).\n *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.\n\nFor example:  \n`curl --request POST `\n\n`--user email@example.com:<api_token> `\n\n`--header 'X-Atlassian-Token: no-check' `\n\n`--header 'Content-Type: image/< image_type>' `\n\n`--data-binary \"<@/path/to/file/with/your/avatar>\" `\n\n`--url 'https://your-domain.atlassian.net/rest/api/3/project/{projectIdOrKey}/avatar2'`\n\nThe avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the image. The length of the square's sides is set to the smaller of the height or width of the image.\n\nThe cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.\n\nAfter creating the avatar use [Set project avatar](#api-rest-api-3-project-projectIdOrKey-avatar-put) to set it as the project's displayed avatar.\n\n**[Permissions](#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg).",
  input: CreateProjectAvatarInput,
  output: CreateProjectAvatarOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/project/{projectIdOrKey}/avatar2", data) as any
  },
})
