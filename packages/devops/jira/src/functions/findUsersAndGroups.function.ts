// Group and user picker — This resource represents a list of users and a list of groups. Use it to obtain the details to populate user and group picker suggestions list.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnauthorizedError, ForbiddenError, TooManyRequestsError } from '@pikku/core/errors'

export const FindUsersAndGroupsInput = z.object({
  query: z.string().describe("The search string."),
  maxResults: z.number().int().optional().default(50).describe("The maximum number of items to return in each list."),
  showAvatar: z.boolean().optional().default(false).describe("Whether the user avatar should be returned. If an invalid value is provided, the default value is used."),
  fieldId: z.string().optional().describe("The custom field ID of the field this request is for."),
  projectId: z.array(z.string()).optional().describe("The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present."),
  issueTypeId: z.array(z.string()).optional().describe("The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present."),
  avatarSize: z.enum(["xsmall", "xsmall@2x", "xsmall@3x", "small", "small@2x", "small@3x", "medium", "medium@2x", "medium@3x", "large", "large@2x", "large@3x", "xlarge", "xlarge@2x", "xlarge@3x", "xxlarge", "xxlarge@2x", "xxlarge@3x", "xxxlarge", "xxxlarge@2x", "xxxlarge@3x"]).optional().default("xsmall").describe("The size of the avatar to return. If an invalid value is provided, the default value is used."),
  caseInsensitive: z.boolean().optional().default(false).describe("Whether the search for groups should be case insensitive."),
  excludeConnectAddons: z.boolean().optional().default(false).describe("Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used."),
})

export const FindUsersAndGroupsOutput = z.object({
  groups: z.object({
    groups: z.array(z.object({
      groupId: z.string().optional().describe("The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*."),
      html: z.string().optional().describe("The group name with the matched query string highlighted with the HTML bold tag."),
      labels: z.array(z.object({
        text: z.string().optional().describe("The group label name."),
        title: z.string().optional().describe("The title of the group label."),
        type: z.enum(["ADMIN", "SINGLE", "MULTIPLE"]).optional().describe("The type of the group label."),
      })).optional(),
      name: z.string().optional().describe("The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.`"),
    })).optional(),
    header: z.string().optional().describe("Header text indicating the number of groups in the response and the total number of groups found in the search."),
    total: z.number().int().optional().describe("The total number of groups found in the search."),
  }).optional().describe("The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched groups."),
  users: z.object({
    header: z.string().optional().describe("Header text indicating the number of users in the response and the total number of users found in the search."),
    total: z.number().int().optional().describe("The total number of users found in the search."),
    users: z.array(z.object({
      accountId: z.string().optional().describe("The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."),
      avatarUrl: z.string().url().optional().describe("The avatar URL of the user."),
      displayName: z.string().optional().describe("The display name of the user. Depending on the user’s privacy setting, this may be returned as null."),
      html: z.string().optional().describe("The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag."),
      key: z.string().optional().describe("This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
      name: z.string().optional().describe("This property is no longer available . See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."),
    })).optional(),
  }).optional().describe("The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users."),
}).describe("List of users and groups found in a search.")

export const findUsersAndGroups = pikkuSessionlessFunc({
  description: "Returns a list of users and groups matching a string. The string is used:\n\n *  for users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required.\n *  for groups, to find a case-sensitive match with group name.\n\nFor example, if the string *tin* is used, records with the display name *Tina*, email address *sarah@tinplatetraining.com*, and the group *accounting* would be returned.\n\nOptionally, the search can be refined to:\n\n *  the projects and issue types associated with a custom field, such as a user picker. The search can then be further refined to return only users and groups that have permission to view specific:\n    \n     *  projects.\n     *  issue types.\n    \n    If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.\n *  not return Connect app users and groups.\n *  return groups that have a case-insensitive match with the query.\n\nThe primary use case for this resource is to populate a picker field suggestion list with users or groups. To this end, the returned object includes an `html` field for each list. This field highlights the matched query term in the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for use in a picker, specifically *Showing X of Y matching groups*.\n\nThis operation can be accessed anonymously.\n\n**[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/yodKLg).",
  input: FindUsersAndGroupsInput,
  output: FindUsersAndGroupsOutput,
  errors: [BadRequestError, UnauthorizedError, ForbiddenError, TooManyRequestsError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/groupuserpicker", data) as any
  },
})
