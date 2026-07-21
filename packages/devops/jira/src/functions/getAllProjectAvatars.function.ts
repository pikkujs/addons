// Project avatars — This resource represents avatars associated with a project. Use it to get, load, set, and remove project avatars.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { UnauthorizedError, NotFoundError } from '@pikku/core/errors'

export const GetAllProjectAvatarsInput = z.object({
  projectIdOrKey: z.string().describe("The ID or (case-sensitive) key of the project."),
})

export const GetAllProjectAvatarsOutput = z.object({
  custom: z.array(z.object({
    fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
    id: z.string().describe("The ID of the avatar."),
    isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
    isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
    isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
    owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
    urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
  })).optional().describe("List of avatars added to Jira. These avatars may be deleted."),
  system: z.array(z.object({
    fileName: z.string().optional().describe("The file name of the avatar icon. Returned for system avatars."),
    id: z.string().describe("The ID of the avatar."),
    isDeletable: z.boolean().optional().describe("Whether the avatar can be deleted."),
    isSelected: z.boolean().optional().describe("Whether the avatar is used in Jira. For example, shown as a project's avatar."),
    isSystemAvatar: z.boolean().optional().describe("Whether the avatar is a system avatar."),
    owner: z.string().optional().describe("The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user."),
    urls: z.record(z.string(), z.string().url()).optional().describe("The list of avatar icon URLs."),
  })).optional().describe("List of avatars included with Jira. These avatars cannot be deleted."),
}).describe("List of project avatars.")

export const getAllProjectAvatars = pikkuSessionlessFunc({
  description: "Returns all project avatars, grouped by system and custom avatars.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.",
  input: GetAllProjectAvatarsInput,
  output: GetAllProjectAvatarsOutput,
  errors: [UnauthorizedError, NotFoundError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/project/{projectIdOrKey}/avatars", data) as any
  },
})
