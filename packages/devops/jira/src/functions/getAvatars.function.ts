// Avatars — This resource represents system and custom avatars. Use it to obtain the details of system or custom avatars, add and remove avatars from a project or issue type, and obtain avatar images.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetAvatarsInput = z.object({
  type: z.enum(["project", "issuetype"]).describe("The avatar type."),
  entityId: z.string().describe("The ID of the item the avatar is associated with."),
})

export const GetAvatarsOutput = z.object({
  custom: z.array(z.object({
    fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
    id: z.string().describe("The ID of the avatar."),
    isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
    isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
    isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
    owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
    urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
  })).optional().describe("Custom avatars list."),
  system: z.array(z.object({
    fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
    id: z.string().describe("The ID of the avatar."),
    isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
    isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
    isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
    owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
    urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
  })).optional().describe("System avatars list."),
}).describe("Details about system and custom avatars.")

export const getAvatars = pikkuSessionlessFunc({
  description: "Returns the system and custom avatars for a project or issue type.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:**\n\n *  for custom project avatars, *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project the avatar belongs to.\n *  for custom issue type avatars, *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for at least one project the issue type is used in.\n *  for system avatars, none.",
  input: GetAvatarsInput,
  output: GetAvatarsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/universal_avatar/type/{type}/owner/{entityId}", data) as any
  },
})
