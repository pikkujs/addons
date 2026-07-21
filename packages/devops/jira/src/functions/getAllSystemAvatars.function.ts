// Avatars — This resource represents system and custom avatars. Use it to obtain the details of system or custom avatars, add and remove avatars from a project or issue type, and obtain avatar images.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, InternalServerError } from '@pikku/core/errors'

export const GetAllSystemAvatarsInput = z.object({
  type: z.enum(["issuetype", "project", "user"]).describe("The avatar type."),
})

export const GetAllSystemAvatarsOutput = z.object({
  system: z.array(z.object({
    fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
    id: z.string().describe("The ID of the avatar."),
    isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
    isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
    isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
    owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
    urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
  })).optional().describe("A list of avatar details."),
}).describe("List of system avatars.")

export const getAllSystemAvatars = pikkuSessionlessFunc({
  description: "Returns a list of system avatar details by owner type, where the owner types are issue type, project, or user.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** None.",
  input: GetAllSystemAvatarsInput,
  output: GetAllSystemAvatarsOutput,
  errors: [UnauthorizedError, InternalServerError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/avatar/{type}/system", data) as any
  },
})
